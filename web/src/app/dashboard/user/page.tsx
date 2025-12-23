import { AppSidebarUser } from "@/components/app-sidebar-user" 
import { UserStatsCards } from "@/components/user-cards" 
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function DashboardUserPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "280px",
          "--header-height": "64px",
        } as React.CSSProperties
      }
    >
      <AppSidebarUser variant="inset" />
      
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              <div className="px-4 lg:px-6">
                 <h2 className="text-2xl font-bold tracking-tight mb-4">Dashboard Penghuni</h2>
                 <UserStatsCards />
              </div>

              <div className="px-4 lg:px-6 mt-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold mb-2">Pengumuman & Info Kos</h3>
                    <p className="text-sm text-muted-foreground">
                        Tidak ada pengumuman baru dari pengelola kos hari ini.
                    </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}