// lib/api.ts

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ApiOptions<TBody = unknown> = {
  method?: HttpMethod;
  body?: TBody;
  token?: string;
  headers?: HeadersInit;
};

export async function apiFetch<TResponse = unknown, TBody = unknown>(
  endpoint: string,
  options: ApiOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", body, token, headers = {} } = options;

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

  const data: TResponse = await res.json();
  return data;
}
