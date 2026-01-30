import api from "@/services/instance/instance";
import { useMutation } from "@tanstack/react-query";
import type { ChatMessagePayload, ChatMessageResponse } from "./chat.types";

export const useChatMessage = () => {
  return useMutation<
    ChatMessageResponse,
    { detail: string },
    ChatMessagePayload
  >({
    mutationKey: ["chat-message"],

    mutationFn: async (payload) => {
      const formData = new FormData();

      // Required fields
      formData.append("thread_id", payload.thread_id);
      // formData.append("user_id", payload.user_id);
      formData.append("is_audio", String(payload.is_audio));

      // Optional fields
      if (payload.message) {
        formData.append("message", payload.message);
      }

      if (payload.audio) {
        formData.append("audio", payload.audio, "audio.webm");
      }

      if (payload.hospital_id) {
        formData.append("hospital_id", payload.hospital_id);
      }

      const { data } = await api.post<ChatMessageResponse>(
        "/chat/message",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return data;
    },
  });
};
