import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }

    const prismaError = err as { code?: string };

    if (prismaError.code === "P2002") {
        res.status(409).json({ message: "Resource with this unique field already exists" });
        return;
    }

    if (prismaError.code === "P2025") {
        res.status(404).json({ message: "Resource not found" });
        return;
    }

    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
}