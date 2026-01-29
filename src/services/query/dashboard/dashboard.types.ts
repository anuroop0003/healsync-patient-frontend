export type TokenInfo = {
  token_number: string;
  doctor_name: string;
  doctor_specialization: string;
  current_token: string;
  approx_waiting_time: string;
};

export type AbhaInfo = {
  abha_address: string;
  abha_number: string;
  year_of_birth: number;
  month_of_birth: number;
  day_of_birth: number;
  gender: "M" | "F";
};

export type PatientData = {
  name: string;
  token: TokenInfo | null;
  abha: AbhaInfo;
  last_prescription_date: string;
};

export type GetPatientResponse = {
  message: string;
  data: PatientData;
};
