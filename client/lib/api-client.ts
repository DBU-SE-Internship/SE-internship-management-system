import type { ApiResponse, ApiErrorResponse } from '@/types/api.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Standard fetch wrapper that handles JSON envelopes, Better Auth credentials,
 * and error formatting uniformly across all frontend features.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Includes Better Auth session cookies automatically
  });

  const data = await response.json();

  if (!response.ok) {
    const errorPayload = data as ApiErrorResponse;
    throw new Error(errorPayload.error?.message || `Request failed with status ${response.status}`);
  }

  return data as ApiResponse<T>;
}
