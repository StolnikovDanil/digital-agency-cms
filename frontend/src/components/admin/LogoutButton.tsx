"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function LogoutButton() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handleLogout() {
        setIsLoggingOut(true);

        try {
            await apiFetch("/auth/logout", { method: "POST" });
        } catch (error) {
            console.error(error);
        } finally {
            router.push("/admin/login");
            router.refresh();
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-sm text-gray-500 hover:text-gray-800 disabled:opacity-50"
        >
            {isLoggingOut ? "Выход..." : "Выйти"}
        </button>
    );
}