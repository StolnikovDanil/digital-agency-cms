import Link from "next/link";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
    return (
        <main className="max-w-2xl mx-auto px-4 py-16">
            <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6"
            >
                ← Назад к списку
            </Link>

            <h1 className="text-3xl font-bold mb-8">Новая статья</h1>

            <PostForm mode="create" />
        </main>
    );
}