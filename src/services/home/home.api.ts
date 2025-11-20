import { apiFetch } from "@/lib/api";

const BASE_URL = "http://localhost:8000";

export const getDashboardStats = async (token: string) => {
  return apiFetch(`${BASE_URL}/seller/dashboard/`, {
    method: "GET",
    token,
  });
};
