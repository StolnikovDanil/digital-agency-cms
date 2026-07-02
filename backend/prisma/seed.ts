import { prisma } from "../src/lib/prisma.js";

const posts = [
    {
        title: "Как мы построили Digital Agency лендинг на Next.js 16",
        slug: "kak-my-postroili-digital-agency-lending",
        excerpt: "Разбираем архитектурные решения при создании лендинга агентства на App Router.",
        content:
            "В этой статье разберём, почему для лендинга Digital Agency мы выбрали Next.js 16 с App Router, как организовали структуру компонентов и какие решения по производительности приняли на старте проекта.",
        coverImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8",
        publishedAt: new Date("2026-06-01"),
    },
    {
        title: "Prisma 7: что изменилось и как мигрировать",
        slug: "prisma-7-chto-izmenilos",
        excerpt: "Обзор breaking changes в Prisma 7 и пошаговая инструкция миграции проекта.",
        content:
            "Prisma 7 принесла крупные изменения: обязательные driver adapters, новый конфиг prisma.config.ts вместо url в schema.prisma, и генератор prisma-client вместо prisma-client-js. В статье разберём каждое изменение и покажем, как обновить существующий проект.",
        coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
        publishedAt: new Date("2026-06-10"),
    },
    {
        title: "SSR vs ISR: что выбрать для блога в 2026 году",
        slug: "ssr-vs-isr-chto-vybrat-dlya-bloga",
        excerpt: "Сравниваем стратегии рендеринга для блога и разбираем, когда какая подходит.",
        content:
            "SSR подходит для страниц, которым нужны свежие данные при каждом запросе, а ISR — для контента, который меняется редко, но должен быть быстрым. В контексте блога разберём конкретные кейсы: список статей, отдельная статья, админ-панель.",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        publishedAt: null,
    },
];

async function main() {
    console.log("Start seeding...");

    for (const post of posts) {
        const created = await prisma.post.upsert({
            where: { slug: post.slug },
            update: {},
            create: post,
        });

        console.log(`Created post: ${created.title}`);
    }

    console.log("Seeding finished.");
}

main()
    .catch((error) => {
        console.error("Seeding failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });