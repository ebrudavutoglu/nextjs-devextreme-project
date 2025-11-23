import Sidebar from "@/components/sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* İçerik */}
      <div className="flex-1 p-8 bg-gray-100 overflow-auto">{children}</div>
    </div>
  );
}
