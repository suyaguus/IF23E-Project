"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Bed,
  Wifi,
  Wind,
  Bath,
  Tv,
  CalendarCheck,
  Loader2,
  AlertCircle,
  MapPin,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useKamarDetail } from "@/hooks/useKamar";

export default function KamarDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id); // Convert param to number

  const [isBooking, setIsBooking] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  // --- 1. FETCH DATA ---
  const { data: room, isLoading, isError } = useKamarDetail(id);

  // --- 2. IMAGE LOGIC (Same as List Page) ---
  const [imgSrc, setImgSrc] = React.useState<string>("");
  const [hasError, setHasError] = React.useState(false);

  // Update image source whenever room data is loaded
  React.useEffect(() => {
    if (room?.nomorKamar) {
      const cleanNumber = room.nomorKamar.replace(/Kamar\s*/i, "").trim();
      setImgSrc(`/images/kamar/${cleanNumber}.jpg`);
    }
  }, [room]);

  const handleImageError = () => {
    if (imgSrc.endsWith(".jpg") && room?.nomorKamar) {
        const cleanNumber = room.nomorKamar.replace(/Kamar\s*/i, "").trim();
        setImgSrc(`/images/kamar/${cleanNumber}.png`);
    } else {
      if (!hasError) {
        setImgSrc("/images/placeholder-room.jpg");
        setHasError(true);
      }
    }
  };

  // --- 3. HELPER FUNCTIONS ---
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const getStatusColor = (status: string) => {
    const s = String(status).toLowerCase();
    if (s === "tersedia") return "bg-green-600 hover:bg-green-700 text-white border-transparent";
    if (s === "tersewa" || s === "penuh") return "bg-red-600 hover:bg-red-700 text-white border-transparent";
    return "bg-gray-500 hover:bg-gray-600 text-white border-transparent";
  };

  // Dummy helper for facilities icon (since backend might not send icons)
  const getFacilityIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("wifi")) return <Wifi className="h-5 w-5" />;
    if (n.includes("ac") || n.includes("kipas")) return <Wind className="h-5 w-5" />;
    if (n.includes("mandi")) return <Bath className="h-5 w-5" />;
    if (n.includes("tv")) return <Tv className="h-5 w-5" />;
    if (n.includes("kasur") || n.includes("bed")) return <Bed className="h-5 w-5" />;
    return <CheckCircle2 className="h-5 w-5" />;
  };

  const handleBooking = async () => {
    setIsBooking(true);
    // Simulasi proses API booking
    setTimeout(() => {
      setIsBooking(false);
      setOpenDialog(false);
      toast.success("Permintaan Booking Terkirim!", {
        description: "Admin akan segera memverifikasi pesanan Anda.",
      });
      router.push("/dashboard/user/pembayaran");
    }, 1500);
  };

  // --- 4. LOADING & ERROR STATES ---
  if (isLoading) {
    return (
      <section className="flex h-[50vh] w-full items-center justify-center flex-col gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Memuat detail kamar...</p>
      </section>
    );
  }

  if (isError || !room) {
    return (
      <section className="flex h-[50vh] w-full items-center justify-center flex-col gap-3 text-destructive">
        <AlertCircle className="h-10 w-10" />
        <p>Kamar tidak ditemukan atau terjadi kesalahan.</p>
        <Button variant="outline" onClick={() => router.back()}>Kembali</Button>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      {/* Tombol Kembali */}
      <div>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2 pl-0 hover:pl-2 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KOLOM KIRI: GAMBAR UTAMA */}
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted shadow-sm relative">
            <img
              src={imgSrc}
              alt={`Kamar ${room.nomorKamar}`}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
             <div className="absolute top-4 right-4">
                <Badge className={`${getStatusColor(String(room.statusKamar))} text-sm px-3 py-1`}>
                    {String(room.statusKamar)}
                </Badge>
             </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">Kamar {room.nomorKamar}</h1>
            </div>
            
            <p className="text-muted-foreground leading-relaxed text-justify">
              {room.deskripsi || "Tidak ada deskripsi tersedia untuk kamar ini."}
            </p>
          </div>

          <Separator />

          {/* Bagian Fasilitas (Render dari data backend jika ada) */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Fasilitas Kamar</h3>
            {room.fasilitas && room.fasilitas.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.fasilitas.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-background"
                  >
                    {/* Menggunakan any sementara untuk menghindari error properti nested */}
                    <div className="text-primary">
                      {getFacilityIcon((item as any).fasilitas?.namaFasilitas || (item as any).namaFasilitas || "Fasilitas")}
                    </div>
                    <span className="text-sm font-medium">
                      {/* Ambil nama dari relasi nested atau langsung */}
                      {(item as any).fasilitas?.namaFasilitas || (item as any).namaFasilitas}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                Belum ada data fasilitas.
              </p>
            )}
          </div>

          {/* Bagian Perabotan */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Perabotan</h3>
            {room.perabotan && room.perabotan.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.perabotan.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-background"
                  >
                    <div className="text-primary">
                      <Bed className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">
                      {/* PERBAIKAN: Menghapus kondisi dan memperbaiki akses nama */}
                      {(item as any).perabotan?.namaPerabotan || (item as any).namaPerabotan}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                Belum ada data perabotan.
              </p>
            )}
          </div>
        </div>

        {/* KOLOM KANAN: CARD BOOKING (STICKY) */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 shadow-md border-primary/10">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Harga Sewa</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">
                    {formatRupiah(room.hargaSewa)}
                  </span>
                  <span className="text-muted-foreground">/ bulan</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kapasitas</span>
                  <span className="font-medium">1 Orang</span> 
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ukuran</span>
                  <span className="font-medium">3x4 m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimal Sewa</span>
                  <span className="font-medium">1 Bulan</span>
                </div>
              </div>

              {/* DIALOG KONFIRMASI BOOKING */}
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={String(room.statusKamar) !== "Tersedia"}
                  >
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    {String(room.statusKamar) === "Tersedia"
                      ? "Ajukan Sewa Sekarang"
                      : "Kamar Tidak Tersedia"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Konfirmasi Pemesanan</DialogTitle>
                    <DialogDescription>
                      Apakah Anda yakin ingin memesan{" "}
                      <strong>Kamar {room.nomorKamar}</strong>?
                    </DialogDescription>
                  </DialogHeader>

                  <div className="py-4 space-y-4">
                    <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tagihan Awal</span>
                        <span className="font-semibold">
                          {formatRupiah(room.hargaSewa)}
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Durasi</span>
                        <span>1 Bulan</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      *Dengan menekan tombol Booking, permintaan Anda akan
                      dikirim ke Admin untuk proses verifikasi dan pembayaran.
                    </p>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenDialog(false)}
                    >
                      Batal
                    </Button>
                    <Button onClick={handleBooking} disabled={isBooking}>
                      {isBooking ? "Memproses..." : "Ya, Booking Kamar"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}