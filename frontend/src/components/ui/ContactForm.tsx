"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // TODO: заменить на реальный запрос к API, когда появится /contact на бэке
        setTimeout(() => {
            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");
        }, 500);
    };

    if (status === "success") {
        return (
            <p className="mt-8 rounded-lg bg-green-50 p-4 text-center text-green-700">
                Спасибо! Сообщение отправлено.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none"
            />
            <textarea
                placeholder="Сообщение"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none"
            />
            <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-lg bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-700 disabled:opacity-50"
            >
                {status === "submitting" ? "Отправка..." : "Отправить"}
            </button>
        </form>
    );
}