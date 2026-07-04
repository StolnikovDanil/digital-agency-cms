
const API_URL =
    typeof window === "undefined" ? process.env.BACKEND_URL : "/api";

if (!API_URL) {
    throw new Error("BACKEND_URL is not defined");
}

interface ApiFieldError {
    field: string;
    message: string;
}

export class ApiError extends Error {
    status: number;
    errors?: ApiFieldError[];

    constructor(message: string, status: number, errors?: ApiFieldError[]) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}

interface ApiFetchOptions extends RequestInit {
    cookieHeader?: string;
}

export async function apiFetch<T>(
    endpoint: string,
    options?: ApiFetchOptions
): Promise<T> {
    const { cookieHeader, ...restOptions } = options ?? {};

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...restOptions,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
            ...restOptions.headers,
        },
    });

    if (!response.ok) {
        let body: { message?: string; errors?: ApiFieldError[] } | null = null;

        try {
            body = await response.json();
        } catch {
            // тело не JSON или пустое — оставляем body как null
        }

        throw new ApiError(
            body?.message || `API error: ${response.status} ${response.statusText}`,
            response.status,
            body?.errors
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    const text = await response.text();
    return text ? (JSON.parse(text) as T) : (undefined as T);
}