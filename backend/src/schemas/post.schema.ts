import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(200),
    slug: z
        .string()
        .min(3, "Slug must be at least 3 characters")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, alphanumeric, hyphen-separated"),
    excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(300),
    content: z.string().min(20, "Content must be at least 20 characters"),
    coverImage: z.string().url("Cover image must be a valid URL").optional().nullable(),
    publishedAt: z.string().datetime().optional().nullable(),
});

export const updatePostSchema = createPostSchema.partial();

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;