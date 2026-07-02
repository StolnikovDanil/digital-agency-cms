export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    publishedAt: string | null;
    createdAt: string;
    updatedAt: string;
}