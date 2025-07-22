import { jwtDecode } from "jwt-decode";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ApiOptions<TBody = unknown> = {
  method?: HttpMethod;
  body?: TBody;
  token?: string;
  headers?: HeadersInit;
  onTokenExpired?: () => void;
};

type DecodedToken = {
  username: string;
  email: string;
  exp: number;
  iat: number;
};

export async function apiFetch<TResponse = unknown, TBody = unknown>(
  endpoint: string,
  options: ApiOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body, token, headers = {} } = options;
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.exp * 1000 < Date.now()) {
        if (options?.onTokenExpired) {
          options.onTokenExpired();
        } else {
          localStorage.removeItem("accessToken");
          window.location.replace("/auth/login");
        }
        throw new Error("Token expired. Authentication required.");
      }
    } catch (err) {
      console.error("Failed to decode or validate token:", err);
      if (options?.onTokenExpired) {
        options.onTokenExpired();
      } else {
        localStorage.removeItem("accessToken");
        window.location.replace("/auth/login");
      }
      throw new Error("Invalid token. Authentication required.");
    }
  }

  const res = await fetch(`${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.detail ||
        errorData.message ||
        (errorData.non_field_errors && errorData.non_field_errors.join(", ")) ||
        "API error"
    );
  }

  const contentLength = res.headers.get("content-length");
  if (res.status === 204 || contentLength === "0") {
    return undefined as TResponse;
  }
  const text = await res.text();
  if (!text) {
    return undefined as TResponse;
  }
  const data: TResponse = JSON.parse(text);
  return data;
}
