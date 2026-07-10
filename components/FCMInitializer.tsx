"use client";

import { useEffect } from "react";
import { requestFCMToken } from "@/lib/firebase";
import { saveFCMToken } from "@/features/notifications/api/fcm.api";

export function FCMInitializer() {
  useEffect(() => {
    const initFCM = async () => {
      // Only run in browser
      if (typeof window === "undefined") return;

      // Check if user is logged in
      const user = localStorage.getItem("user");
      if (!user) {
        console.log("🔴 User not logged in, skipping FCM");
        return;
      }

      try {
        console.log("🟡 Requesting FCM token...");
        
        // Get FCM token
        const fcmToken = await requestFCMToken();
        
        if (fcmToken) {
          console.log("✅ FCM Token received:", fcmToken);
          
          // Save token to backend
          await saveFCMToken(fcmToken, "web");
          console.log("✅ FCM Token saved to backend");
        } else {
          console.warn("⚠️ No FCM token received");
        }
      } catch (error) {
        console.error("❌ FCM initialization error:", error);
      }
    };

    initFCM();
  }, []);

  return null;
}