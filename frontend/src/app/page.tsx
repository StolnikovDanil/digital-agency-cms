export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-500">
        Digital Agency
      </span>
        <h1 className="max-w-3xl text-4xl font-bold text-gray-900 sm:text-5xl">
          We build digital products that grow your business
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-600">
          Web development, design and strategy for startups and companies
          ready to scale online.
        </p>
        <button className="mt-8 rounded-lg bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-700">
          Get in touch
        </button>
      </main>
  );
}