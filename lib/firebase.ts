import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get messaging instance
export const messaging = typeof window !== "undefined" 
  ? getMessaging(app) 
  : null;

// Request FCM Token
export const requestFCMToken = async (): Promise<string | null> => {
  try {
    if (!messaging) return null;

    // Request permission
    const permission = await Notification.requestPermission();
    
    if (permission !== "granted") {
      console.warn("⚠️ Notification permission not granted");
      return null;
    }

    // Get token
    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    
    if (!vapidKey) {
      console.error("❌ VAPID key not found");
      return null;
    }

    const token = await getToken(messaging, { vapidKey });
    console.log("✅ FCM Token:", token);
    return token;
  } catch (error) {
    console.error("❌ Error getting FCM token:", error);
    return null;
  }
};

export default app;