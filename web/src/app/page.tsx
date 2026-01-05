import { MapPin } from "lucide-react";
import { KamarCard } from "@/components/kamar-card";
import { AppSidebardashboard } from "@/components/app-sidebar-dashboard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// Pastikan Anda sudah membuat komponen AppSidebarDashboard ini

export default function DashBoardPage() {
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "280px",
            "--header-height": "4rem",
          } as React.CSSProperties
        }
      >
        {/* Panggil Sidebar Khusus Guest */}
        <AppSidebardashboard />

        <SidebarInset>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur flex h-14 items-center px-4 gap-2">
            {/* 2. PASANG TOMBOL TOGGLE DI SINI */}
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-slate-200 mx-2" />{" "}
            {/* Separator kecil (opsional) */}
            <div className="flex flex-1 items-center justify-between">
              <h1 className="font-bold text-lg truncate">Home Page</h1>
            </div>
          </header>

          <section className="px-4 pt-2 lg:px-6">
            <article>
              <h3 className="text-xl font-bold">Deskripsi Kost</h3>
              <article className="mt-2 text-justify leading-relaxed text-muted-foreground">
                Kost ini merupakan pilihan ideal bagi Anda yang menginginkan
                hunian nyaman dengan lokasi strategis di Bandar Lampung.
                Didukung oleh fasilitas yang lengkap, lingkungan yang bersih
                serta aman, dan akses yang mudah ke kampus, perkantoran, maupun
                transportasi umum, kost ini dirancang untuk memberikan
                kenyamanan maksimal dan mendukung aktivitas harian secara
                optimal bagi mahasiswa maupun karyawan.
              </article>
            </article>
          </section>

          {/*  SECTION GAMBAR KAMAR KOST */}
          <section className="px-4 py-10 lg:px-6">
            <h2 className="mb-4 text-xl font-bold">Galeri Kamar Kost</h2>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <KamarCard
                image="/images/kamarkost1.jpg"
                title="Kamar 1"
                category="Khusus Cowok"
                status="Tersedia"
                price="Rp 850.000"
                size="Single • 3 × 3 m"
              />

              <KamarCard
                image="/images/kamarkost2.png"
                title="Kamar 2"
                category="Campur"
                status="Penuh"
                price="Rp 1.000.000"
                size="Double • 4 × 4 m"
              />

              <KamarCard
                image="/images/kamarkost3.png"
                title="Kamar 3"
                category="Khusus Cewek"
                status="Tersedia"
                price="Rp 900.000"
                size="Single • 3 × 3 m"
              />
            </section>
          </section>

          {/* FASILITAS */}
          <section className="px-4 py-4 lg:px-6">
            <h3 className="mb-4 text-xl font-bold">Fasilitas</h3>

            <section className="flex flex-wrap gap-3 text-sm">
              <article className="rounded-full border px-4 py-1">
                ✅ WiFi
              </article>
              <article className="rounded-full border px-4 py-1">
                ✅ Parkir
              </article>
              <article className="rounded-full border px-4 py-1">✅ AC</article>
              <article className="rounded-full border px-4 py-1">
                ✅ Dapur
              </article>
              <article className="rounded-full border px-4 py-1">
                ✅ Kasur
              </article>
              <article className="rounded-full border px-4 py-1">
                ✅ Lemari Pakaian
              </article>
            </section>
          </section>

          {/* PERATURAN KOST */}
          <section className="px-4 py-6 lg:px-6">
            <header className="mb-4">
              <h3 className="text-xl font-bold">Peraturan Kost</h3>
              <p className="text-sm text-muted-foreground">
                Demi kenyamanan dan keamanan bersama, penghuni kost diharapkan mematuhi
                peraturan berikut:
              </p>
            </header>
          </section>

          {/* Alamat Kost */}
          <section className="px-4 py-6 lg:px-6">
            <h3 className="mb-2 text-xl font-bold">Alamat Kost</h3>

            <address className="flex items-center gap-2 text-sm not-italic text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Jl. Dempo, Labuhan Ratu, Kec. Kedaton, Kota Bandar Lampung, Lampung 35132
            </address>
          </section>

          {/* MAPS */}
          <section className="px-4 py-8 lg:px-6">
            <h3 className="mb-4 text-xl font-bold text-center">
              Lokasi Kost
            </h3>

            <div className="flex justify-center">
              <div className="w-full max-w-4xl overflow-hidden rounded-xl border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.2558836600215!2d105.25290367474365!3d-5.377902094600988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dadaba212f15%3A0x95f37fafe88ecffb!2sWisma%20Dempo!5e0!3m2!1sid!2sid!4v1767277670809!5m2!1sid!2sid"
                  className="h-[350px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>

          {/* --- TEMPAT SECTION DATA LAINNYA --- */}
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"> */}

          {/* <div className="min-h-[300px] rounded-xl border bg-muted/50 p-4">
          <ChartAreaInteractive />
      </div> */}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
