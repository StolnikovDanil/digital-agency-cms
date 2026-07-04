import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!JWT_SECRET || !ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
    throw new Error(
        "Missing auth environment variables: JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD_HASH"
    );
}

const COOKIE_NAME = "admin_token";
const TOKEN_EXPIRY = "7d";
const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; 

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        if (email !== ADMIN_EMAIL) {
            throw new AppError("Invalid credentials", 401);
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            ADMIN_PASSWORD_HASH as string
        );

        if (!isPasswordValid) {
            throw new AppError("Invalid credentials", 401);
        }

        const token = jwt.sign({ email }, JWT_SECRET as string, {
            expiresIn: TOKEN_EXPIRY,
        });

        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: COOKIE_MAX_AGE_MS,
            path: "/",
        });

        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        next(error);
    }
}

export async function logout(_req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie(COOKIE_NAME, { path: "/" });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
}