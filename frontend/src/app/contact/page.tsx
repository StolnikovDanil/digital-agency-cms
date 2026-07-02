import ContactForm from "@/components/ui/ContactForm";

export default function ContactPage() {
    return (
        <main className="mx-auto max-w-xl px-6 py-24">
            <h1 className="text-center text-3xl font-bold text-gray-900">
                Связаться с нами
            </h1>
            <p className="mt-2 text-center text-gray-600">
                Оставьте сообщение — ответим в течение рабочего дня.
            </p>
            <ContactForm />
        </main>
    );
}