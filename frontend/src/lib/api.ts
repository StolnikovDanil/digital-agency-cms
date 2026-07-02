const API_URL =
    typeof window === "undefined"
        ? process.env.BACKEND_URL
        : process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error(
        typeof window === "undefined"
            ? "BACKEND_URL is not defined"
            : "NEXT_PUBLIC_API_URL is not defined"
    );
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

    return response.json();
}