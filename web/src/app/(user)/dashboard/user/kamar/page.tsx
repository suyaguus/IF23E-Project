"use client";

import Link from "next/link";
import { Users, MapPin, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useKamar } from "@/hooks/useKamar";
import { useState } from "react";
import { Kamar } from "@/types/interfaces";

export default function KamarListPage() {
  const { data: kamars, isLoading, isError } = useKamar();

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const getImagePath = (nomorKamar: string) => {
    const cleanNumber = nomorKamar.replace(/Kamar\s*/i, "").trim();
    return `/images/kamar/${cleanNumber}.jpg`;
  };

  if (isLoading) {
    return (
      <section className="flex h-[50vh] w-full items-center justify-center flex-col gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Memuat daftar kamar...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center flex-col gap-3 text-destructive">
        <AlertCircle className="h-10 w-10" />
        <p>Gagal memuat data kamar.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Daftar Kamar</h2>
        <p className="text-muted-foreground">
          Pilih kamar yang sesuai dengan kebutuhan dan kenyamanan Anda.
        </p>
      </div>

      {kamars.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-muted/20 border-dashed">
          <p className="text-muted-foreground text-lg">
            Belum ada kamar yang tersedia saat ini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kamars.map((room) => (
            <RoomCard key={room.id} room={room} formatRupiah={formatRupiah} />
          ))}
        </div>
      )}
    </div>
  );
}

interface RoomCardProps {
  room: Kamar;
  formatRupiah: (angka: number) => string;
}

function RoomCard({ room, formatRupiah }: RoomCardProps) {
  const cleanName = room.nomorKamar.replace(/Kamar\s*/i, "").trim();
  const [imgSrc, setImgSrc] = useState(`/images/kamar/${cleanName}.jpg`);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (imgSrc.endsWith(".jpg")) {
      setImgSrc(`/images/kamar/${cleanName}.png`);
    } else {
      if (!hasError) {
        setImgSrc("/images/placeholder-room.jpg");
        setHasError(true);
      }
    }
  };

  const getStatusColor = (status: string) => {
    const s = String(status).toLowerCase();

    if (s === "tersedia") {
      return "bg-green-600 hover:bg-green-700 text-white border-transparent";
    }
    if (s === "tersewa" || s === "penuh") {
      return "bg-red-600 hover:bg-red-700 text-white border-transparent";
    }
    if (s === "tidak tersedia" || s === "perbaikan") {
      return "bg-gray-500 hover:bg-gray-600 text-white border-transparent";
    }

    return "bg-primary text-primary-foreground";
  };

  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-md transition-shadow group border-primary/10">
      <div className="aspect-video w-full bg-muted relative overflow-hidden">
        <img
          src={imgSrc}
          alt={`Kamar ${room.nomorKamar}`}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-2 right-2">
          <Badge className={getStatusColor(String(room.statusKamar))}>
            {String(room.statusKamar)}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Kamar {room.nomorKamar}</CardTitle>
            <CardDescription className="line-clamp-1 mt-1">
              {room.deskripsi || "Fasilitas lengkap & nyaman"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>1 Orang</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>3x4 m</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4 bg-muted/20">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Harga per bulan</span>
          <span className="font-bold text-lg text-primary">
            {formatRupiah(room.hargaSewa)}
          </span>
        </div>

        <Link href={`/dashboard/user/kamar/${room.id}`}>
          <Button
            size="sm"
            disabled={
              String(room.statusKamar) === "Penuh" ||
              String(room.statusKamar) === "Tersewa" ||
              String(room.statusKamar) === "Tidak Tersedia"
            }
            className={
              String(room.statusKamar) !== "Tersedia" ? "opacity-70" : ""
            }
          >
            {String(room.statusKamar) === "Tersedia"
              ? "Lihat Detail"
              : String(room.statusKamar)}

            {String(room.statusKamar) === "Tersedia" && (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
