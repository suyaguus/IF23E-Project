import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebardashboard } from "@/components/app-sidebar-dashboard";
import { SiteHeader } from "@/components/site-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebardashboard />

      <SidebarInset className="overflow-x-hidden">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur flex h-14 items-center px-4 gap-2">
          {/* 2. PASANG TOMBOL TOGGLE DI SINI */}
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-slate-200 mx-2" />{" "}
          {/* Separator kecil (opsional) */}
          <div className="flex flex-1 items-center justify-between">
            <h1 className="font-bold text-lg truncate">Dashboard Admin</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
