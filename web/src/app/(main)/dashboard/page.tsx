import { MapPin } from "lucide-react"
import { KamarCard } from "@/components/kamar-card";


export default function DashBoardPage() {
  return (
    <>
      <section className="px-4 pt-8 text-center lg:px-6">
        <header className="mx-auto">
          <h2 className="text-xl font-semibold tracking-tight">
            Informasi Kost Wisma Dempo
          </h2>
          <article className="text-sm text-muted-foreground">
            Gambaran umum dan Deskripsi kost
          </article>
        </header>
      </section>


      {/*  SECTION GAMBAR KAMAR KOST */}
      <section className="px-4 py-10 lg:px-6">
        <h2 className="mb-4 text-base font-medium">Galeri Kamar Kost</h2>

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

      <section className="px-4 pt-2 lg:px-6">
        <article>
          <h3 className="text-base font-medium">Deskripsi Kost</h3>
          <article className="mt-2 text-justify leading-relaxed text-muted-foreground">
            Kost ini merupakan pilihan ideal bagi Anda yang menginginkan hunian nyaman
            dengan lokasi strategis di Bandar Lampung. Didukung oleh fasilitas yang
            lengkap, lingkungan yang bersih serta aman, dan akses yang mudah ke kampus,
            perkantoran, maupun transportasi umum, kost ini dirancang untuk memberikan
            kenyamanan maksimal dan mendukung aktivitas harian secara optimal bagi
            mahasiswa maupun karyawan.
          </article>
        </article>
      </section>

      {/* FASILITAS */}
      <section className="px-4 py-4 lg:px-6">
        <h3 className="mb-4 text-base font-medium">Fasilitas</h3>

        <section className="flex flex-wrap gap-3 text-sm">
          <article className="rounded-full border px-4 py-1">✅ WiFi</article>
          <article className="rounded-full border px-4 py-1">✅ Parkir</article>
          <article className="rounded-full border px-4 py-1">✅ AC</article>
          <article className="rounded-full border px-4 py-1">✅ Dapur</article>
          <article className="rounded-full border px-4 py-1">✅ Kasur</article>
          <article className="rounded-full border px-4 py-1">
            ✅ Lemari Pakaian
          </article>
        </section>
      </section>

      {/* Alamat Kost */}
      <section className="px-4 py-6 lg:px-6">
        <h3 className="mb-2 text-base font-medium">Alamat Kost</h3>

        <address className="flex items-center gap-2 text-sm not-italic text-muted-foreground">
          <MapPin className="h-4 w-4" />
          Jl. Jend. Sudirman No.123, Bandar Lampung
        </address>
      </section>


      {/* --- TEMPAT SECTION DATA LAINNYA --- */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"> */}

      {/* <div className="min-h-[300px] rounded-xl border bg-muted/50 p-4">
          <ChartAreaInteractive />
      </div> */}
    </>
  );
}
