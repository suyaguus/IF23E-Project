import { AppSidebaruser } from "@/components/app-sidebar" // Pastikan buat sidebar khusus user atau pakai props
import { UserStatsCards } from "@/components/user-cards" // Komponen kartu baru (kode ada di bawah)
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
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* Ganti AppSidebar dengan AppSidebarUser (sidebar khusus menu user) */}
      <AppSidebarUser variant="inset" />
      
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              {/* BAGIAN CARD KHUSUS USER */}
              {/* Menggantikan <Cards /> milik admin */}
              <div className="px-4 lg:px-6">
                 <h2 className="text-2xl font-bold tracking-tight mb-4">Dashboard Penghuni</h2>
                 <UserStatsCards />
              </div>

              {/* AREA KONTEN TAMBAHAN (Opsional) */}
              {/* Misalnya tabel riwayat pembayaran terakhir */}
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