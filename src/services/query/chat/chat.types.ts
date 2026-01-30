export type ChatMessageResponse = ChatTextResponse | TokenGeneratedResponse;

export interface ChatMessagePayload {
  message?: string;
  audio?: File | Blob;
  thread_id: string;
  // user_id: string;
  hospital_id?: string;
  is_audio: boolean;
}

export interface ChatTextResponse {
  type: "text";
  message: string;
}

export interface TokenGeneratedResponse {
  type: "token_generated" | "content";
  token: string;
  doctor_id: string;
  message: string;
}
