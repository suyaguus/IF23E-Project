import { AppSidebarUser } from "@/components/app-sidebar-user"; // Sidebar khusus User
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header"; // Header (opsional, jika ada)

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "280px",
          "--header-height": "4rem",
        } as React.CSSProperties
      }
    >
      {/* 1. Pasang Sidebar User di sini */}
      <AppSidebarUser />

      {/* 2. Area Konten Utama */}
      <SidebarInset>
        {/* Header User (Opsional, agar header nempel di atas konten) */}
        <SiteHeader />

        {/* Konten Halaman (Dashboard, Profile, dll) akan dirender di sini */}
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
