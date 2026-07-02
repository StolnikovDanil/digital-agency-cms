"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, ApiError } from "@/src/lib/api";

interface FormErrors {
    [key: string]: string;
}

export default function NewPostPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [isPublished, setIsPublished] = useState(false);

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [generalError, setGeneralError] = useState<string | null>(null);

    function generateSlug(value: string) {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    }

    function handleTitleChange(value: string) {
        setTitle(value);
        setSlug(generateSlug(value));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors({});
        setGeneralError(null);
        setIsSubmitting(true);

        try {
            await apiFetch("/posts", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    slug,
                    excerpt,
                    content,
                    coverImage: coverImage || undefined,
                    publishedAt: isPublished ? new Date().toISOString() : null,
                }),
            });

            router.push("/admin");
            router.refresh();
        } catch (error) {
            if (error instanceof ApiError && error.errors) {
                const fieldErrors: FormErrors = {};
                for (const fieldError of error.errors) {
                    fieldErrors[fieldError.field] = fieldError.message;
                }
                setErrors(fieldErrors);
                setGeneralError("Проверьте правильность заполнения полей.");
            } else {
                setGeneralError("Не удалось создать статью. Попробуйте снова.");
            }
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="max-w-2xl mx-auto px-4 py-16">
            <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6"
            >
                ← Назад к списку
            </Link>

            <h1 className="text-3xl font-bold mb-8">Новая статья</h1>

            {generalError && (
                <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md mb-6">
                    {generalError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Заголовок</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                    {errors.title && (
                        <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm"
                        required
                    />
                    {errors.slug && (
                        <p className="text-sm text-red-600 mt-1">{errors.slug}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Описание</label>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                    {errors.excerpt && (
                        <p className="text-sm text-red-600 mt-1">{errors.excerpt}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Содержимое</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />
                    {errors.content && (
                        <p className="text-sm text-red-600 mt-1">{errors.content}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Обложка (URL, опционально)
                    </label>
                    <input
                        type="text"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    {errors.coverImage && (
                        <p className="text-sm text-red-600 mt-1">{errors.coverImage}</p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isPublished"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                    />
                    <label htmlFor="isPublished" className="text-sm">
                        Опубликовать сразу
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
                >
                    {isSubmitting ? "Создание..." : "Создать статью"}
                </button>
            </form>
        </main>
    );
}