import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import "dotenv/config";
import { app } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

const testPost = {
    title: "Тестовый пост для vitest",
    slug: "testovyy-post-dlya-vitest",
    excerpt: "Описание тестового поста для проверки API",
    content: "Содержимое тестового поста, созданного автоматическим тестом.",
};

let createdId: string;

describe("Posts API", () => {
    afterAll(async () => {
        await prisma.post.deleteMany({ where: { slug: testPost.slug } });
        await prisma.$disconnect();
    });

    it("GET /posts returns 200 and an array", async () => {
        const res = await request(app).get("/posts");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("POST /posts creates a post with valid data", async () => {
        const res = await request(app).post("/posts").send(testPost);

        expect(res.status).toBe(201);
        expect(res.body.slug).toBe(testPost.slug);

        createdId = res.body.id;
    });

    it("POST /posts returns 400 for invalid data", async () => {
        const res = await request(app).post("/posts").send({ title: "ab" });

        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    it("GET /posts/:slug returns the created post", async () => {
        const res = await request(app).get(`/posts/${testPost.slug}`);

        expect(res.status).toBe(200);
        expect(res.body.title).toBe(testPost.title);
    });

    it("GET /posts/:slug returns 404 for unknown slug", async () => {
        const res = await request(app).get("/posts/unknown-slug-xyz");

        expect(res.status).toBe(404);
    });

    it("PUT /posts/:id updates the post", async () => {
        const res = await request(app)
            .put(`/posts/${createdId}`)
            .send({ title: "Обновлённый тестовый пост" });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe("Обновлённый тестовый пост");
    });

    it("DELETE /posts/:id removes the post", async () => {
        const res = await request(app).delete(`/posts/${createdId}`);

        expect(res.status).toBe(204);
    });

    it("GET /posts/:slug returns 404 after deletion", async () => {
        const res = await request(app).get(`/posts/${testPost.slug}`);

        expect(res.status).toBe(404);
    });
});