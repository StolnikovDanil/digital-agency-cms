import ContactForm from "@/src/components/ui/ContactForm";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-500">
        Диджитал-агентство
      </span>

        <h1 className="max-w-3xl text-4xl font-bold text-gray-900 sm:text-5xl">
          Создаём digital-продукты, которые растят ваш бизнес
        </h1>

        <p className="mt-6 max-w-xl text-lg text-gray-600">
          Веб-разработка, дизайн и стратегия для стартапов и компаний,
          готовых масштабироваться онлайн.
        </p>

        <a
            href="#contact"
            className="mt-8 rounded-lg bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-700"
        >
          Связаться с нами
        </a>

        <section
            id="contact"
            className="mt-24 w-full max-w-xl scroll-mt-24 text-left"
        >
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Связаться с нами
          </h2>

          <p className="mt-2 text-center text-gray-600">
            Оставьте сообщение — ответим в течение рабочего дня.
          </p>

          <ContactForm />
        </section>
      </main>
  );
}