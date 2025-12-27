import { AppSidebarUser } from "@/components/app-sidebar-user"; // Sidebar khusus User
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur flex h-14 items-center px-4 gap-2">
            {/* 2. PASANG TOMBOL TOGGLE DI SINI */}
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-slate-200 mx-2" />{" "}
            {/* Separator kecil (opsional) */}
            <div className="flex flex-1 items-center justify-between">
              <h1 className="font-bold text-lg truncate">Home Page</h1>
            </div>
          </header>

        {/* Konten Halaman (Dashboard, Profile, dll) akan dirender di sini */}
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
