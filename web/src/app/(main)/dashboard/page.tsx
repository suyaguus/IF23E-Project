import { MapPin } from "lucide-react"
import { KamarCard } from "@/components/kamar-card";


export default function DashBoardPage() {
  return (
    <>
      {/*  SECTION GAMBAR KAMAR KOST */}
      <section className="px-4 py-10 lg:px-6">
         <h2 className="mb-4 text-base font-medium">Galeri Kamar Kost</h2>
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
