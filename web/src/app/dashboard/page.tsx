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
                <div className="px-4 py-6 lg:px-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        Galeri Kamar Kost
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="w-full">
                            <Image
                                src="/images/kamarkost1.png"
                                alt="Kamar Kost 1"
                                width={600}
                                height={400}
                                className="object-contain w-full"
                            />
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
        </SidebarProvider>

    )
}