import { cookies } from "next/headers";
import { apiFetch, ApiError } from "./api";

export { ApiError };

export async function serverApiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    return apiFetch<T>(endpoint, {
        ...options,
        cookieHeader,
    });
}