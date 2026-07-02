"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/src/lib/api";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            router.push("/admin");
            router.refresh();
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) {
                setError("Неверный email или пароль.");
            } else {
                setError("Не удалось войти. Попробуйте снова.");
            }
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="max-w-sm mx-auto px-4 py-24">
            <h1 className="text-2xl font-bold mb-8">Вход в админ-панель</h1>

            {error && (
                <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
                >
                    {isSubmitting ? "Вход..." : "Войти"}
                </button>
            </form>
        </main>
    );
}