import { MetadataRoute } from "next";
import { apiFetch } from "@/src/lib/api";
import { Post } from "@/src/types/post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const posts = await apiFetch<Post[]>("/posts");
    const publishedPosts = posts.filter((post) => post.publishedAt !== null);

    const postUrls: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        ...postUrls,
    ];
}