"use client";

import { useState, useEffect } from "react";
import { requestFCMToken, onMessageListener, messaging } from "@/lib/firebase";
import { saveFCMToken, removeFCMToken } from "../api/fcm.api";
import { toast } from "sonner";

// ============================================
// HOOK: INITIALIZE FCM
// ============================================
export const useFCM = () => {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<boolean>(false);

  useEffect(() => {
    // CHECK NOTIFICATION PERMISSION
    const checkPermission = async () => {
      if (typeof window === "undefined") return;

      if (Notification.permission === "granted") {
        setPermission(true);
        await getAndSaveToken();
      } else if (Notification.permission === "default") {
        // Silent: don't request automatically
      }
    };

    // GET AND SAVE TOKEN
    const getAndSaveToken = async () => {
      try {
        const fcmToken = await requestFCMToken();

        if (fcmToken) {
          setToken(fcmToken);

          // Save token to backend
          const user = localStorage.getItem("user");
          if (user) {
            await saveFCMToken(fcmToken, "web");
          }
        }
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };

    checkPermission();

    // CLEANUP: Remove token on unmount
    return () => {
      if (token) {
        removeFCMToken(token).catch(console.error);
      }
    };
  }, []);

  // REQUEST PERMISSION (User action)
  const requestPermission = async () => {
    try {
      const fcmToken = await requestFCMToken();

      if (fcmToken) {
        setToken(fcmToken);
        setPermission(true);

        // Save token to backend
        await saveFCMToken(fcmToken, "web");

        return { success: true, token: fcmToken };
      }

      return { success: false, message: "Permission denied" };
    } catch (error) {
      return { success: false, message: "Error requesting permission" };
    }
  };

  return {
    token,
    permission,
    requestPermission,
    isSupported: typeof window !== "undefined" && !!messaging,
  };
};

// ============================================
// HOOK: LISTEN FOR MESSAGES
// ============================================
export const useFCMListener = () => {
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const listen = async () => {
      try {
        const payload = await onMessageListener();
        if (payload) {
          setNotification(payload);

          // Show toast for incoming notification
          const payloadData = payload as any;
          toast.success(payloadData.notification?.title || "New Notification", {
            description: payloadData.notification?.body || "",
            duration: 5000,
            action: {
              label: "View",
              onClick: () => {
                window.location.href = payloadData.data?.clickAction || "/dashboard";
              },
            },
          });
        }
      } catch (error) {
        console.error("Error listening for messages:", error);
      }
    };

    listen();
  }, []);

  return notification;
};