import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    const secret =
        req.nextUrl.searchParams.get("secret") ??
        req.headers.get("x-revalidate-secret");

    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    let slug: string | undefined;
    try {
        const body = await req.json();
        if (typeof body?.slug === "string") slug = body.slug;
    } catch {
        // тело не обязательно — просто ревалидируем /blog
    }

    try {
        revalidatePath("/blog");
        if (slug) {
            revalidatePath(`/blog/${slug}`);
        }

        return NextResponse.json({ revalidated: true, slug: slug ?? null, now: Date.now() });
    } catch (error) {
        console.error("[revalidate] Ошибка при ревалидации:", error);
        return NextResponse.json(
            { message: "Error revalidating", error: String(error) },
            { status: 500 }
        );
    }
}