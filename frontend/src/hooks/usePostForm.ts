import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { generateSlug } from "@/lib/slug";
import { Post } from "@/types/post";

interface FormErrors {
    [key: string]: string;
}

export interface PostFormValues {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    isPublished: boolean;
}

interface UsePostFormOptions {
    mode: "create" | "edit";
    post?: Post;
}

function getInitialValues(mode: "create" | "edit", post?: Post): PostFormValues {
    if (mode === "edit" && post) {
        return {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage ?? "",
            isPublished: post.publishedAt !== null,
        };
    }
    return {
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        isPublished: false,
    };
}

export function usePostForm({ mode, post }: UsePostFormOptions) {
    const router = useRouter();

    const [values, setValues] = useState<PostFormValues>(() =>
        getInitialValues(mode, post)
    );
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [generalError, setGeneralError] = useState<string | null>(null);

    function setField<K extends keyof PostFormValues>(
        field: K,
        value: PostFormValues[K]
    ) {
        setValues((prev) => ({ ...prev, [field]: value }));
    }

    function handleTitleChange(value: string) {
        setField("title", value);
        if (mode === "create") {
            setField("slug", generateSlug(value));
        }
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors({});
        setGeneralError(null);
        setIsSubmitting(true);

        const payload = {
            title: values.title,
            slug: values.slug,
            excerpt: values.excerpt,
            content: values.content,
            coverImage: values.coverImage || undefined,
            publishedAt: values.isPublished
                ? post?.publishedAt ?? new Date().toISOString()
                : null,
        };

        try {
            if (mode === "edit" && post) {
                await apiFetch(`/posts/${post.id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                });
            } else {
                await apiFetch("/posts", {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
            }

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
                setGeneralError(
                    mode === "edit"
                        ? "Не удалось сохранить статью. Попробуйте снова."
                        : "Не удалось создать статью. Попробуйте снова."
                );
            }
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        values,
        setField,
        handleTitleChange,
        handleSubmit,
        errors,
        isSubmitting,
        generalError,
    };
}