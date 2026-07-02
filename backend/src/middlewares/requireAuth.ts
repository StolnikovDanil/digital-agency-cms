import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET environment variable");
}

const COOKIE_NAME = "admin_token";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
    try {
        const token = req.cookies[COOKIE_NAME];

        if (!token) {
            throw new AppError("Unauthorized", 401);
        }

        jwt.verify(token, JWT_SECRET as string);

        next();
    } catch (error) {
        if (error instanceof AppError) {
            next(error);
        } else {
            next(new AppError("Unauthorized", 401));
        }
    }
}