import { apiFetch } from "@/lib/api";
import { LoginPayload, RegisterPayload, AuthResponse } from "@/types/auth"; // Assuming types exist

const BASE_URL = "http://localhost:8000";

export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>(`${BASE_URL}/auth/login/`, {
    method: "POST",
    body: data,
  });
};

export const registerUser = async (data: RegisterPayload): Promise<AuthResponse> => {
  return apiFetch<AuthResponse>(`${BASE_URL}/auth/register/`, {
    method: "POST",
    body: data,
  });
};
