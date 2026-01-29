import { z } from "zod";

export const loginSchema = z.object({
  aadhar: z.string().regex(/^\d{12}$/, "Aadhaar must be exactly 12 digits"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
