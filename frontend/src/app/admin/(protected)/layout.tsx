import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 py-3 flex justify-end">
                    <LogoutButton />
                </div>
            </div>
            {children}
        </div>
    );
}