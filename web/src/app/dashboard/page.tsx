import { AppSidebardashboard } from "@/components/app-sidebardashboard";
import { SiteHeaderDashboard } from "@/components/site-headerdashboard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";


export default function DashBoardPage() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebardashboard />
            <SidebarInset>
                <SiteHeaderDashboard />

                {/* SECTION GAMBAR KAMAR KOST */}
                <div className="px-4 py-10 lg:px-6">
                    <h2 className="mb-4 text-base font-medium">Galeri Kamar Kost</h2>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="w-full">
                            <Image
                                src="/images/kamarkost1.jpg"
                                alt="Kamar Kost 1"
                                width={600}
                                height={400}
                                className="object-contain w-full"
                            />
                        </div>
                        <div className="w-full">
                            <Image
                                src="/images/kamarkost2.png"
                                alt="Kamar Kost 2"
                                width={600}
                                height={400}
                                className="object-contain w-full"
                            />
                        </div>
                        <div className="w-full">
                            <Image
                                src="/images/kamarkost3.png"
                                alt="Kamar Kost 3"
                                width={600}
                                height={400}
                                className="object-contain w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="px-4 py-6 lg:px-6">
                    <h2 className="mb-3 text-lg font-semibold">Lokasi Kost</h2>

                    {/* Lokasi */}
                    <div className="mb-6 rounded-lg border bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            📍
                            <span>Jl. Mawar Raya No. 123, Jakarta Selatan</span>
                        </div>
                    </div>

                    <h3 className="mb-3 text-base font-semibold">Fasilitas</h3>
                    <div className="flex flex-wrap gap-3">
                        <span className="flex items-center gap-2 rounded-full border px-4 py-1 text-sm">
                            ✅ WiFi
                        </span>
                        <span className="flex items-center gap-2 rounded-full border px-4 py-1 text-sm">
                            ✅ Parkir
                        </span>
                        <span className="flex items-center gap-2 rounded-full border px-4 py-1 text-sm">
                            ✅ AC
                        </span>
                        <span className="flex items-center gap-2 rounded-full border px-4 py-1 text-sm">
                            ✅ Dapur
                        </span>
                    </div>


                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                {/* bagian card */}

                                {/* bagian section data */}
                                {/* <SectionCards /> */}
                                {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}

                            </div>
                        </div>
                    </div>
                </div>

            </SidebarInset>
        </SidebarProvider>

    )
}