"use client";

import { useEffect } from "react";

export default function AdminError({
                                       error,
                                   }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    function handleRetry() {
        window.location.reload();
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