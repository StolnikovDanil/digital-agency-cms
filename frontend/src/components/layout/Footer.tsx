import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-3 text-xs text-gray-500 sm:flex-row">
                <p>© {year} Agency. All rights reserved.</p>

                <nav className="flex items-center gap-6">
                    <Link href="/" className="hover:text-gray-900">
                        Home
                    </Link>
                    <Link href="/blog" className="hover:text-gray-900">
                        Blog
                    </Link>
                    <Link href="/#contact" className="hover:text-gray-900">
                        Contact
                    </Link>
                </nav>
            </div>
        </footer>
    );
}