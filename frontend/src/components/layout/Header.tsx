"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/blog", label: "Блог" },
    { href: "/#contact", label: "Контакты" },
];

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="border-b border-gray-200">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-lg font-bold text-gray-900">
                    Agency
                </Link>

                <nav className="hidden items-center gap-8 text-sm font-medium sm:flex">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={
                                    isActive
                                        ? "text-gray-900"
                                        : "text-gray-700 hover:text-gray-900"
                                }
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="text-gray-700 sm:hidden"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </div>

            {isMenuOpen && (
                <nav className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 text-sm font-medium sm:hidden">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={
                                    isActive
                                        ? "text-gray-900"
                                        : "text-gray-700 hover:text-gray-900"
                                }
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}