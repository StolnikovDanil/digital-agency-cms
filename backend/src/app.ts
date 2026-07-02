import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export const app = express();

app.use(
    cors({
        origin: FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({ message: "Blog API is running" });
});

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);