export default function BlogLoading() {
    return (
        <main className="max-w-5xl mx-auto px-4 py-16">
            <div className="h-10 w-32 bg-gray-200 rounded-md mb-10 animate-pulse" />

            <div className="grid gap-8 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="border border-gray-200 rounded-lg p-6 space-y-3"
                    >
                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                    </div>
                ))}
            </div>
        </main>
    );
}