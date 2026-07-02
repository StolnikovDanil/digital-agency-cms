import { MetadataRoute } from "next";
import { apiFetch } from "@/src/lib/api";
import { Post } from "@/src/types/post";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const staticUrls: MetadataRoute.Sitemap = [
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
    ];

    let publishedPosts: Post[] = [];

    try {
        publishedPosts = await apiFetch<Post[]>("/posts/published");
    } catch (error) {
        console.error("sitemap: failed to fetch published posts", error);
    }

    const postUrls: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [...staticUrls, ...postUrls];
}