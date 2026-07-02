export default function AdminLoading() {
    return (
        <main className="max-w-5xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-10">
                <div className="h-9 w-64 bg-gray-200 rounded animate-pulse" />
                <div className="h-9 w-32 bg-gray-200 rounded-md animate-pulse" />
            </div>

            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-12 w-full bg-gray-100 rounded animate-pulse" />
                ))}
            </div>
        </main>
    );
}