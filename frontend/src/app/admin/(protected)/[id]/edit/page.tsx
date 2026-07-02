import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { serverApiFetch, ApiError } from "@/src/lib/api.server";
import { Post } from "@/src/types/post";
import EditPostForm from "@/src/components/admin/EditPostForm";

export const metadata: Metadata = {
    title: "Редактирование статьи | Digital Agency",
    robots: { index: false, follow: false },
};

interface EditPageProps {
    params: Promise<{ id: string }>;
}

async function getPostById(id: string): Promise<Post | null> {
    try {
        return await serverApiFetch<Post>(`/posts/id/${id}`);
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            return null;
        }
        throw error;
    }
}

export default async function EditPostPage({ params }: EditPageProps) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <main className="max-w-2xl mx-auto px-4 py-16">
            <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6"
            >
                ← Назад к списку
            </Link>

            <h1 className="text-3xl font-bold mb-8">Редактирование статьи</h1>
            <EditPostForm post={post} />
        </main>
    );
}