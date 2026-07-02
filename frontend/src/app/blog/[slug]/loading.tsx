export default function PostLoading() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-16">
            <div className="h-4 w-24 bg-gray-200 rounded mb-6 animate-pulse" />
            <div className="h-10 w-3/4 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="h-4 w-40 bg-gray-200 rounded mb-8 animate-pulse" />
            <div className="h-64 w-full bg-gray-200 rounded-lg mb-8 animate-pulse" />
            <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            </div>
        </main>
    );
}