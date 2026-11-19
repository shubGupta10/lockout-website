import AdminHeader from "@/components/layout/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AdminHeader />
            <div className="pt-20 sm:pt-24 md:pt-28">
                {children}
            </div>
        </>
    );
}