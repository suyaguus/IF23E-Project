import { AppSidebarUser } from "@/components/app-sidebar-user";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
      <AppSidebarUser />
      <SidebarInset>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur flex h-14 items-center px-4 gap-2">
          <SidebarTrigger className="-ml-1" />
          <span
            className="h-4 w-px bg-slate-200 mx-2"
            aria-hidden="true"
          />
          <section className="flex flex-1 items-center justify-between">
            <h1 className="font-bold text-lg truncate">
              Home Page
            </h1>
          </section>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>

    </SidebarProvider>
  );
}
