import { UserStatsCards } from "@/components/user-cards";
import { QuickActions } from "@/components/quick-actions";
import { RecentActivity } from "@/components/recent-activity";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardUserPage() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <section className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
          <section className="@container/main flex flex-1 flex-col gap-8">
            <section className="space-y-4">
              <header>
            <h2 className="text-2xl font-bold tracking-tight">
              Dashboard Penghuni
            </h2>
            <p className="text-muted-foreground">
              Selamat datang kembali! Berikut ringkasan akun Anda.
            </p>
          </header>
              <UserStatsCards />
            </section>

            <section className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Layanan Mandiri
              </h3>
              <QuickActions />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 min-h-[200px]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">
                      Pengumuman & Info Kos
                    </h3>
                    <span className="text-xs text-primary font-medium cursor-pointer hover:underline">
                      Lihat Semua
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center py-8 border-2 border-dashed rounded-lg border-muted/20">
                    <p className="text-sm text-muted-foreground italic">
                      Tidak ada pengumuman baru dari pengelola kos hari ini.
                    </p>
                  </div>
                </div>
              </div>

              <section className="lg:col-span-1">
                <RecentActivity />
              </section>
            </section>
          </section>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
