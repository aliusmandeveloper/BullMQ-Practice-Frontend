// FIREBASE MESSAGING SERVICE WORKER
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCJwdz0TgZvGQDDGECKM3ycXiPCAXNNCKo",
  authDomain: "notificationtaskmngsystem.firebaseapp.com",
  projectId: "notificationtaskmngsystem",
  storageBucket: "notificationtaskmngsystem.firebasestorage.app",
  messagingSenderId: "927444907925",
  appId: "1:927444907925:web:f2e0e13bbc45acdc19689c",
  measurementId: "G-T04Z0M9JX9"
};

// INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// BACKGROUND MESSAGE HANDLER
messaging.onBackgroundMessage((payload) => {
  console.log("📱 Background message received:", payload);

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    vibrate: [200, 100, 200],
    data: payload.data || {},
    requireInteraction: true,
    actions: [
      {
        action: "open",
        title: "View",
      },
    ],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// NOTIFICATION CLICK HANDLER
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.clickAction || "/dashboard";
  
  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    }).then((windowClients) => {
      // If window is already open, focus it
      for (const client of windowClients) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});