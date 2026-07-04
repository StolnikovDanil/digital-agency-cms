import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { contactSchema } from "@/schemas/contact.schema";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const data = contactSchema.parse(body);

        const message = `
📩 Новое сообщение

👤 Имя: ${data.name}
📧 Email: ${data.email}

💬 Сообщение:
${data.message}
`;

        const response = await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: process.env.TELEGRAM_CHAT_ID,
                    text: message,
                }),
            }
        );

        if (!response.ok) {
            
            const errorText = await response.text();
            throw new Error(`Telegram API error ${response.status}: ${errorText}`);
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {

        if (error instanceof ZodError) {
            console.warn("[contact] Невалидные данные:", error.issues);
            return NextResponse.json(
                {
                    success: false,
                    message: "Проверьте правильность заполнения полей.",
                },
                { status: 400 }
            );
        }

        console.error("[contact] Не удалось отправить сообщение:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Не удалось отправить сообщение. Попробуйте позже.",
            },
            { status: 500 }
        );
    }
}