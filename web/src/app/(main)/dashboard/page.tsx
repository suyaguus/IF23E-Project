import { MapPin } from "lucide-react"
import { KamarCard } from "@/components/kamar-card";


export default function DashBoardPage() {
  return (
    <>
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

      {/* --- TEMPAT SECTION DATA LAINNYA --- */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SectionCards />
      </div> */}

      {/* <div className="min-h-[300px] rounded-xl border bg-muted/50 p-4">
          <ChartAreaInteractive />
      </div> */}
    </>
  );
}
