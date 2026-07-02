import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-gray-500 sm:flex-row">
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