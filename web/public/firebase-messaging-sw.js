importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js",
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCYtveOnvyWCVYtT_mAfk_1aeQaAGYAllA",
  authDomain: "ml8monitors.firebaseapp.com",
  projectId: "ml8monitors",
  storageBucket: "ml8monitors.appspot.com",
  messagingSenderId: "229828936184",
  appId: "1:229828936184:web:a1938218aab32248d8160d",
  measurementId: "G-JNP673WQ17",
});

const messaging = firebase.messaging();

// [START messaging_on_background_message]
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  // Customize notification here
  const notificationTitle =
    payload?.notification?.title || "notification title";
  const notificationOptions = {
    body: payload?.notification?.body || "notification body",
    icon: payload?.notification?.image || "/firebase-logo.png",
  };

  return registration.showNotification(notificationTitle, notificationOptions);
});
