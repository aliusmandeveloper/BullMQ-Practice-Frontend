import axiosInstance from "@/lib/axios";

export const saveFCMToken = async (token: string, deviceInfo?: string) => {
  try {
    const res = await axiosInstance.post("/fcm/token", {
      token,
      deviceInfo: deviceInfo || "web",
    });
    console.log("✅ FCM token saved:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error saving FCM token:", error);
    throw error;
  }
};