"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    contactSchema,
    ContactFormData,
} from "@/schemas/contact.schema";

export default function ContactForm() {
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setSuccess(false);
        setServerError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Ошибка отправки"
                );
            }

            setSuccess(true);
            reset();
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : "Неизвестная ошибка"
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4"
        >
            <div>
                <input
                    type="text"
                    placeholder="Имя"
                    {...register("name")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none"
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none"
                />

                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <textarea
                    rows={5}
                    placeholder="Сообщение"
                    {...register("message")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:outline-none"
                />

                {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                    </p>
                )}
            </div>

            {serverError && (
                <p className="text-sm text-red-500">
                    {serverError}
                </p>
            )}

            {success && (
                <p className="text-sm text-green-600">
                    Сообщение успешно отправлено
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-700 disabled:opacity-50"
            >
                {isSubmitting
                    ? "Отправка..."
                    : "Отправить"}
            </button>
        </form>
    );
}