"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { Post } from "@/types/post";

interface FormErrors {
    [key: string]: string;
}

interface EditPostFormProps {
    post: Post;
}

export default function EditPostForm({ post }: EditPostFormProps) {
    const router = useRouter();

    const [title, setTitle] = useState(post.title);
    const [slug, setSlug] = useState(post.slug);
    const [excerpt, setExcerpt] = useState(post.excerpt);
    const [content, setContent] = useState(post.content);
    const [coverImage, setCoverImage] = useState(post.coverImage ?? "");
    const [isPublished, setIsPublished] = useState(post.publishedAt !== null);

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [generalError, setGeneralError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors({});
        setGeneralError(null);
        setIsSubmitting(true);

        try {
            await apiFetch(`/posts/${post.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    title,
                    slug,
                    excerpt,
                    content,
                    coverImage: coverImage || undefined,
                    publishedAt: isPublished
                        ? post.publishedAt ?? new Date().toISOString()
                        : null,
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
                setGeneralError("Не удалось сохранить статью. Попробуйте снова.");
            }
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {generalError && (
                <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-md">
                    {generalError}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium mb-1">Заголовок</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    Опубликовано
                </label>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
            >
                {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
            </button>
        </form>
    );
}