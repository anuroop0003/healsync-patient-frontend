import api from "@/services/instance/instance";
import { useQuery } from "@tanstack/react-query";
import type { GetPatientResponse } from "./dashboard.types";

export const useGetDashboard = () => {
  return useQuery<GetPatientResponse, { detail: string }, GetPatientResponse>({
    queryKey: ["get-dashboard"],
    queryFn: async () => {
      const { data } = await api.get<GetPatientResponse>("/patient/dashboard");
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
