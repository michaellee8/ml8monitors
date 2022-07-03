// See: https://github.com/microsoft/TypeScript/issues/14877
/** @type {ServiceWorkerGlobalScope} */
let self;

function initInSw() {
  // [START messaging_init_in_sw]
  // Give the service worker access to Firebase Messaging.
  // Note that you can only use Firebase Messaging here. Other Firebase libraries
  // are not available in the service worker.
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

  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();
  // [END messaging_init_in_sw]
}

function onBackgroundMessage() {
  const messaging = firebase.messaging();

  // [START messaging_on_background_message]
  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  // [END messaging_on_background_message]
}
