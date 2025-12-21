import { AppSidebardashboard } from "@/components/app-sidebardashboard";
import { SiteHeaderDashboard } from "@/components/site-headerdashboard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";
import { MapPin } from "lucide-react"



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

                     {/* KAMAR 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="overflow-hidden rounded-lg border">
                            <div className="group relative">
                                <Image
                                    src="/images/kamarkost1.jpg"
                                    alt="Kamar Kost 1"
                                    width={600}
                                    height={400}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                <div className="pointer-events-none absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/50" />

                                <div className="absolute bottom-0 z-10 w-full px-4 py-3 text-white">
                                    <p className="text-sm font-medium">Kamar 1</p>
                                    <p className="text-xs opacity-80">Khusus Cowok</p>
                                    <span className="mt-1 inline-block rounded-full bg-green-600 px-3 py-0.5 text-xs">
                                        Tersedia
                                    </span>
                                </div>
                            </div>

                            {/* Info bawah gambar */}
                            <div className="space-y-1 p-4">
                                <p className="text-sm text-muted-foreground">Harga / bulan</p>
                                <p className="text-base font-medium">Rp 850.000</p>
                                <p className="text-sm text-muted-foreground">Single • 3 × 3 m</p>
                            </div>
                        </div>


                        {/* KAMAR 2 */}
                        <div className="overflow-hidden rounded-lg border">
                            <div className="group relative">
                                <Image
                                    src="/images/kamarkost2.png"
                                    alt="Kamar Kost 2"
                                    width={600}
                                    height={400}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/50" />

                                <div className="absolute bottom-0 z-10 w-full px-4 py-3 text-white">
                                    <p className="text-sm font-medium">Kamar 2</p>
                                    <p className="text-xs opacity-80">Campur</p>
                                    <span className="mt-1 inline-block rounded-full bg-red-600 px-3 py-0.5 text-xs">
                                        Penuh
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1 p-4">
                                <p className="text-sm text-muted-foreground">Harga / bulan</p>
                                <p className="text-base font-medium">Rp 1.000.000</p>
                                <p className="text-sm text-muted-foreground">Double • 4 × 4 m</p>
                            </div>
                        </div>

                        {/* KAMAR 3 */}
                        <div className="overflow-hidden rounded-lg border">
                            <div className="group relative">
                                <Image
                                    src="/images/kamarkost3.png"
                                    alt="Kamar Kost 3"
                                    width={600}
                                    height={400}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/50" />

                                <div className="absolute bottom-0 z-10 w-full px-4 py-3 text-white">
                                    <p className="text-sm font-medium">Kamar 3</p>
                                    <p className="text-xs opacity-80">Khusus Cewek</p>
                                    <span className="mt-1 inline-block rounded-full bg-green-600 px-3 py-0.5 text-xs">
                                        Tersedia
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1 p-4">
                                <p className="text-sm text-muted-foreground">Harga / bulan</p>
                                <p className="text-base font-medium">Rp 900.000</p>
                                <p className="text-sm text-muted-foreground">Single • 3 × 3 m</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-6 lg:px-6 space-y-8">

                    {/* Fasilitas */}
                    <div>
                        <h3 className="mb-4 text-base font-medium">Fasilitas</h3>
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
                            <span className="flex items-center gap-2 rounded-full border px-4 py-1 text-sm">
                                ✅ Kasur
                            </span>
                            <span className="flex items-center gap-2 rounded-full border px-4 py-1 text-sm">
                                ✅ Lemari Pakaian
                            </span>
                        </div>
                    </div>


                    {/* Alamat Kost */}
                    <div>
                        <h2 className="mb-4 text-base font-medium">Alamat Kost</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>Jl. Mawar Raya No. 123, Jakarta Selatan</span>
                        </div>
                    </div>
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

            </SidebarInset>
        </SidebarProvider >

    )
}