export type SendOtpPayload = {
  aadhaar_number: string;
  mobile: string;
};

export type SendOtpResponse = {
  mobile: string;
  txn_id: string;
};

export type VerifyOtpPayload = {
  txn_id: string;
  mobile: string;
  otp: string;
};

export type VerifyOtpResponse = {
  token: string;
};
