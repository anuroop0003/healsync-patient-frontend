import api from "@/services/instance/instance";
import { useMutation } from "@tanstack/react-query";
import type {
  SendOtpPayload,
  SendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "./login.types";

export const useSendOtp = () => {
  return useMutation<SendOtpResponse, { detail: string }, SendOtpPayload>({
    mutationKey: ["send-otp"],
    mutationFn: async (payload) => {
      const { data } = await api.post<SendOtpResponse>(
        "/patient/otp/send",
        payload,
      );
      return data;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation<VerifyOtpResponse, { detail: string }, VerifyOtpPayload>({
    mutationKey: ["verify-otp"],
    mutationFn: async (payload) => {
      const { data } = await api.post<VerifyOtpResponse>(
        "/patient/otp/verify",
        payload,
      );
      return data;
    },
  });
};
