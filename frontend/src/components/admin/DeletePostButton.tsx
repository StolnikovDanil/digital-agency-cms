"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/src/lib/api";

interface DeletePostButtonProps {
    postId: string;
    postTitle: string;
}

export default function DeletePostButton({
                                             postId,
                                             postTitle,
                                         }: DeletePostButtonProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        const confirmed = window.confirm(
            `Удалить статью "${postTitle}"? Это действие необратимо.`
        );

        if (!confirmed) return;

        setIsDeleting(true);

        try {
            await apiFetch(`/posts/${postId}`, { method: "DELETE" });
            router.refresh();
        } catch (error) {
            if (error instanceof ApiError) {
                alert(`Не удалось удалить статью: ${error.message}`);
            } else {
                alert("Не удалось удалить статью. Попробуйте снова.");
            }
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-sm text-red-600 hover:underline disabled:opacity-50"
        >
            {isDeleting ? "Удаление..." : "Удалить"}
        </button>
    );
}