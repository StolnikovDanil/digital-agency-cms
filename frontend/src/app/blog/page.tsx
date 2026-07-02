import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import { Post } from "@/types/post";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Блог | Digital Agency",
    description: "Статьи о разработке, дизайне и digital-маркетинге.",
};

async function getPosts(): Promise<Post[]> {
    return apiFetch<Post[]>("/posts/published");
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main className="max-w-5xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-10">Блог</h1>

            {posts.length === 0 ? (
                <p className="text-gray-500">Пока нет опубликованных статей.</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                        >
                            {post.coverImage && (
                                <div className="relative w-full aspect-video">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                                <span className="text-xs text-gray-400">
                    {new Date(post.publishedAt as string).toLocaleDateString("ru-RU")}
                  </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}