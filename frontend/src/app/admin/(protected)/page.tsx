import Link from "next/link";
import { Metadata } from "next";
import { serverApiFetch } from "@/src/lib/api.server";
import { Post } from "@/src/types/post";
import DeletePostButton from "@/src/components/admin/DeletePostButton";

export const metadata: Metadata = {
    title: "Админ-панель | Digital Agency",
    robots: { index: false, follow: false },
};

async function getAllPosts(): Promise<Post[]> {
    return serverApiFetch<Post[]>("/posts");
}

export default async function AdminPage() {
    const posts = await getAllPosts();

    return (
        <main className="max-w-5xl mx-auto px-4 py-16">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                <h1 className="text-3xl font-bold">Управление статьями</h1>
                <Link
                    href="/admin/new"
                    className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
                >
                    + Новая статья
                </Link>
            </div>

            {posts.length === 0 ? (
                <p className="text-gray-500">Статей пока нет.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse">
                        <thead>
                        <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                            <th className="py-3">Заголовок</th>
                            <th className="py-3">Slug</th>
                            <th className="py-3">Статус</th>
                            <th className="py-3">Обновлено</th>
                            <th className="py-3"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="border-b border-gray-100">
                                <td className="py-3 font-medium">{post.title}</td>
                                <td className="py-3 text-sm text-gray-500">{post.slug}</td>
                                <td className="py-3">
                                    {post.publishedAt ? (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Опубликовано
                      </span>
                                    ) : (
                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                        Черновик
                      </span>
                                    )}
                                </td>
                                <td className="py-3 text-sm text-gray-500">
                                    {new Date(post.updatedAt).toLocaleDateString("ru-RU")}
                                </td>
                                <td className="py-3 text-right space-x-3 whitespace-nowrap">
                                    <Link
                                        href={`/admin/${post.id}/edit`}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Редактировать
                                    </Link>
                                    <DeletePostButton
                                        postId={post.id}
                                        postTitle={post.title}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}