import { z } from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Минимум 2 символа")
        .max(50, "Максимум 50 символов"),

    email: z
        .email("Некорректный email"),

    message: z
        .string()
        .min(10, "Минимум 10 символов")
        .max(1000, "Максимум 1000 символов"),
});

export type ContactFormData = z.infer<typeof contactSchema>;