"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function PostError({
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
        <main className="max-w-3xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Не удалось загрузить статью</h1>
            <p className="text-gray-500 mb-8">
                Попробуйте обновить страницу или вернитесь к списку статей.
            </p>
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={handleRetry}
                    className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800"
                >
                    Попробовать снова
                </button>
                <Link
                    href="/blog"
                    className="text-sm text-gray-500 hover:underline"
                >
                    К списку статей
                </Link>
            </div>
        </main>
    );
}