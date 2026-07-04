import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { loginRateLimit } from "../middlewares/loginRateLimit.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", loginRateLimit, validate(loginSchema), login);
router.post("/logout", logout);

export default router;