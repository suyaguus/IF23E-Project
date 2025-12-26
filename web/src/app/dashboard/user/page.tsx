import { AppSidebarUser } from "@/components/app-sidebar-user" 
import { UserStatsCards } from "@/components/user-cards" 
import { QuickActions } from "@/components/quick-actions" // Komponen baru
import { RecentActivity } from "@/components/recent-activity" // Komponen baru
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
        
        {/* Kontainer Utama */}
        <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
          <div className="@container/main flex flex-1 flex-col gap-8">
            
            {/* 1. Header & Statistik Utama */}
            <section className="space-y-4">
               <div>
                  <h2 className="text-2xl font-bold tracking-tight">Dashboard Penghuni</h2>
                  <p className="text-muted-foreground">Selamat datang kembali! Berikut ringkasan akun Anda.</p>
               </div>
               <UserStatsCards />
            </section>

            {/* 2. Bagian Aksi Cepat (Quick Actions) */}
            <section className="space-y-4">
               <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Layanan Mandiri</h3>
               <QuickActions />
            </section>

            {/* 3. Grid untuk Pengumuman & Aktivitas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Kolom Kiri: Pengumuman (Lebar) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 min-h-[200px]">
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="font-semibold text-lg">Pengumuman & Info Kos</h3>
                       <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Lihat Semua</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center py-8 border-2 border-dashed rounded-lg border-muted/20">
                        <p className="text-sm text-muted-foreground italic">
                            Tidak ada pengumuman baru dari pengelola kos hari ini.
                        </p>
                    </div>
                </div>
              </div>

              {/* Kolom Kanan: Aktivitas Terakhir (Sempit) */}
              <div className="lg:col-span-1">
                <RecentActivity />
              </div>

            </div>
            
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}