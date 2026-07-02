import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Post } from "@/types/post";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
    try {
        return await apiFetch<Post>(`/posts/${slug}`);
    } catch {
        return null;
    }
}

export async function generateMetadata({
                                           params,
                                       }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: "Статья не найдена | Digital Agency",
        };
    }

    return {
        title: `${post.title} | Digital Agency`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.coverImage ? [post.coverImage] : [],
            type: "article",
            publishedTime: post.publishedAt ?? undefined,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post || !post.publishedAt) {
        notFound();
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-16">
            <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-8"
            >
                ← Назад к статьям
            </Link>

            <article>
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                    <time className="text-sm text-gray-400">
                        {new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </time>
                </header>

                {post.coverImage && (
                    <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-lg max-w-none whitespace-pre-line">
                    {post.content}
                </div>
            </article>
        </main>
    );
}