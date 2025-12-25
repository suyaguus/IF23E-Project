import Image from "next/image";

export default function DashBoardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* --- SECTION GAMBAR KAMAR KOST --- */}
      <div className="py-4">
        <h2 className="mb-6 text-lg font-semibold">Galeri Kamar Kost</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full bg-muted rounded-lg overflow-hidden border">
            <Image
              src="/images/kamarkost1.jpg"
              alt="Kamar Kost 1"
              width={600}
              height={400}
              className="object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="w-full bg-muted rounded-lg overflow-hidden border">
            <Image
              src="/images/kamarkost2.png"
              alt="Kamar Kost 2"
              width={600}
              height={400}
              className="object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="w-full bg-muted rounded-lg overflow-hidden border">
            <Image
              src="/images/kamarkost3.png"
              alt="Kamar Kost 3"
              width={600}
              height={400}
              className="object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* --- TEMPAT SECTION DATA LAINNYA --- */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SectionCards />
      </div> */}

      {/* <div className="min-h-[300px] rounded-xl border bg-muted/50 p-4">
          <ChartAreaInteractive />
      </div> */}
    </div>
  );
}
