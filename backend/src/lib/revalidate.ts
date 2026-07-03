export async function triggerRevalidate(slug?: string): Promise<void> {
    const frontendUrl = process.env.FRONTEND_URL;
    const secret = process.env.REVALIDATE_SECRET;

    if (!frontendUrl || !secret) {
        console.warn(
            "[revalidate] FRONTEND_URL или REVALIDATE_SECRET не заданы — пропускаю ревалидацию"
        );
        return;
    }

    try {
        const res = await fetch(
            `${frontendUrl}/api/revalidate?secret=${encodeURIComponent(secret)}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(slug ? { slug } : {}),
            }
        );

        if (!res.ok) {
            console.error(
                `[revalidate] Next.js ответил ${res.status}: ${await res.text()}`
            );
        }
    } catch (error) {
        console.error("[revalidate] Не удалось вызвать revalidate endpoint:", error);
    }
}