"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";

export default function AdminError({
                                       error,
                                   }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    const isAuthError = error instanceof ApiError && error.status === 401;

    function handleRetry() {
        window.location.reload();
    }

    if (isAuthError) {
        return (
            <main className="max-w-md mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-bold mb-4">Сессия истекла</h1>
                <p className="text-gray-500 mb-8">
                    Пожалуйста, войдите заново.
                </p>
                <button
                    onClick={() => router.push("/admin/login")}
                    className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800"
                >
                    Войти
                </button>
            </main>
        );
    }

    return (
        <main className="max-w-md mx-auto px-4 py-24 text-center">
            <h1 className="text-2xl font-bold mb-4">Что-то пошло не так</h1>
            <p className="text-gray-500 mb-8">
                Не удалось загрузить данные админ-панели.
            </p>
            <button
                onClick={handleRetry}
                className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800"
            >
                Попробовать снова
            </button>
        </main>
    );
}