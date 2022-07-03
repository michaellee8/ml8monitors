import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getTwfantiEbookLatestChapter } from "./scrapper";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const monitorTwfanti = functions.pubsub
  .schedule("*/5 * * * *")
  .onRun(async (context) => {
    try {
      const STATE_KEY = "twfanti";
      const latestChapterNumber = await getTwfantiEbookLatestChapter();
      const db = admin.firestore();
      const stateKeyRef = db.collection("state").doc(STATE_KEY);
      const doc = await stateKeyRef.get();
      if (!doc.exists) {
        throw new Error("state doc does not exist");
      }
      if (!doc.data()?.value || typeof doc.data()?.value !== "number") {
        throw new Error("state doc invalid");
      }
      const savedChapterNumber = doc.data()?.value;
      if (!savedChapterNumber) {
        throw new Error("state doc invalid");
      }
      if (savedChapterNumber === latestChapterNumber) {
        // state is not changed, nothing to do
        return;
      }
      // state changed, send notifications and update db

      let tokens: string[] = [];
      const devicesQuerySnapshot = await db.collectionGroup("devices").get();
      devicesQuerySnapshot.forEach((doc) => {
        tokens.push(doc.id);
      });
      const splittedTokens = [...chunks(tokens, 400)];

      const fcm = admin.messaging();
      await Promise.all(
        splittedTokens.map(async (tokens) => {
          const message: MulticastMessage = {
            tokens,
            notification: {
              title: "New Twfanti Ebook Chapter Available!",
              body: `New chapter: ${latestChapterNumber}`,
            },
          };
          await fcm.sendMulticast(message);
        }),
      );

      await stateKeyRef.update({
        value: latestChapterNumber,
      });

      console.info(
        `New chapter on twfanti detected and brodcasted: old chapter is ${savedChapterNumber} and new chapter is ${latestChapterNumber}.`,
      );
    } catch (err) {
      console.error(err);
    }
    return null;
  });

function* chunks<T>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
