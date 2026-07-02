"use client";

export default function GlobalError({
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="ru">
        <body>
        <main className="max-w-md mx-auto px-4 py-24 text-center">
            <h1 className="text-2xl font-bold mb-4">Критическая ошибка</h1>
            <p className="text-gray-500 mb-8">
                Приложение не смогло загрузиться. Попробуйте обновить страницу.
            </p>
            <button
                onClick={reset}
                className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800"
            >
                Обновить
            </button>
        </main>
        </body>
        </html>
    );
}