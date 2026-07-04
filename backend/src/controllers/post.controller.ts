import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/AppError.js";
import { triggerRevalidate } from "../lib/revalidate.js";

export async function getPosts(_req: Request, res: Response, next: NextFunction) {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

export async function getPublishedPosts(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const posts = await prisma.post.findMany({
            where: { publishedAt: { not: null } },
            orderBy: { publishedAt: "desc" },
        });

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

export async function getPostBySlug(req: Request, res: Response, next: NextFunction) {
    try {
        const slug = String(req.params.slug);

        const post = await prisma.post.findUnique({
            where: { slug },
        });

        if (!post || !post.publishedAt) {
            throw new AppError("Post not found", 404);
        }

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export async function getPostById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = String(req.params.id);

        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            throw new AppError("Post not found", 404);
        }

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, slug, excerpt, content, coverImage, publishedAt } = req.body;

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                coverImage,
                publishedAt: publishedAt ? new Date(publishedAt) : null,
            },
        });

        res.status(201).json(post);

        if (post.publishedAt) {
            void triggerRevalidate(post.slug);
        }
    } catch (error) {
        next(error);
    }
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
    try {
        const id = String(req.params.id);
        const { title, slug, excerpt, content, coverImage, publishedAt } = req.body;

        const post = await prisma.post.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(slug !== undefined && { slug }),
                ...(excerpt !== undefined && { excerpt }),
                ...(content !== undefined && { content }),
                ...(coverImage !== undefined && { coverImage }),
                ...(publishedAt !== undefined && {
                    publishedAt: publishedAt ? new Date(publishedAt) : null,
                }),
            },
        });

        res.status(200).json(post);
        
        void triggerRevalidate(post.slug);
    } catch (error) {
        next(error);
    }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
    try {
        const id = String(req.params.id);

        const post = await prisma.post.delete({
            where: { id },
        });

        res.status(204).send();

        void triggerRevalidate(post.slug);
    } catch (error) {
        next(error);
    }
}