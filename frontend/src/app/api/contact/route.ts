import { NextRequest, NextResponse } from "next/server";
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
            throw new Error("Telegram API error");
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Ошибка отправки",
            },
            {
                status: 400,
            }
        );
    }
}