"use client";

import { usePostForm } from "@/hooks/usePostForm";
import { Post } from "@/types/post";

interface PostFormProps {
    mode: "create" | "edit";
    post?: Post;
}

const COPY = {
    create: {
        publishedLabel: "Опубликовать сразу",
        submitLabel: "Создать статью",
        submittingLabel: "Создание...",
    },
    edit: {
        publishedLabel: "Опубликовано",
        submitLabel: "Сохранить изменения",
        submittingLabel: "Сохранение...",
    },
};

export default function PostForm({ mode, post }: PostFormProps) {
    const {
        values,
        setField,
        handleTitleChange,
        handleSubmit,
        errors,
        isSubmitting,
        generalError,
    } = usePostForm({ mode, post });

    const copy = COPY[mode];

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
                    value={values.title}
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
                    value={values.slug}
                    onChange={(e) => setField("slug", e.target.value)}
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
                    value={values.excerpt}
                    onChange={(e) => setField("excerpt", e.target.value)}
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
                    value={values.content}
                    onChange={(e) => setField("content", e.target.value)}
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
                    value={values.coverImage}
                    onChange={(e) => setField("coverImage", e.target.value)}
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
                    checked={values.isPublished}
                    onChange={(e) => setField("isPublished", e.target.checked)}
                />
                <label htmlFor="isPublished" className="text-sm">
                    {copy.publishedLabel}
                </label>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
            >
                {isSubmitting ? copy.submittingLabel : copy.submitLabel}
            </button>
        </form>
    );
}