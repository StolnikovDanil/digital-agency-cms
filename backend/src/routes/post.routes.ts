import { Router } from "express";
import {
    getPosts,
    getPublishedPosts,
    getPostBySlug,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} from "../controllers/post.controller.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";

const router = Router();

router.get("/", requireAuth, getPosts);
router.get("/published", getPublishedPosts);
router.get("/id/:id", requireAuth, getPostById);
router.get("/:slug", getPostBySlug);
router.post("/", requireAuth, validate(createPostSchema), createPost);
router.put("/:id", requireAuth, validate(updatePostSchema), updatePost);
router.delete("/:id", requireAuth, deletePost);

export default router;