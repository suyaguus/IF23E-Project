"use client";

import {
  IconTrendingUp,
  IconUser,
  IconDoor,
  IconArmchair,
  IconSparkles,
  IconBed,
  IconFridge,
} from "@tabler/icons-react";
import useSWR from "swr";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sebaiknya gunakan Environment Variable untuk URL API agar tidak hardcode
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Cards() {
  // Fetch semua data dari API
  // Note: Saya uncomment User data jaga-jaga jika ingin dipakai,
  // tapi tidak ditampilkan di return sesuai kode asli Anda.
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR(`${API_BASE_URL}/api/user`, fetcher);

  const {
    data: kamarData,
    error: kamarError,
    isLoading: kamarLoading,
  } = useSWR(`${API_BASE_URL}/api/kamar`, fetcher);

  const {
    data: fasilitasData,
    error: fasilitasError,
    isLoading: fasilitasLoading,
  } = useSWR(`${API_BASE_URL}/api/fasilitas`, fetcher);

  const {
    data: perabotanData,
    error: perabotanError,
    isLoading: perabotanLoading,
  } = useSWR(`${API_BASE_URL}/api/perabotan`, fetcher);

  // Hitung statistik
  const totalUsers = userData?.user?.length || 0;
  const totalKamar = kamarData?.kamar?.length || 0;
  const totalFasilitas = fasilitasData?.fasilitas?.length || 0;
  const totalPerabotan = perabotanData?.perabotan?.length || 0;

  // Helper function untuk menampilkan nilai card
  const getCardValue = (isLoading: boolean, error: unknown, value: number) => {
    if (isLoading) return "...";
    if (error) return "0";
    return value;
  };

  return (
    // PERUBAHAN UTAMA DI SINI (Layout Grid):
    // grid-cols-1    : 1 kolom di HP
    // md:grid-cols-2 : 2 kolom di Tablet
    // lg:grid-cols-3 : 3 kolom di Laptop/PC (Sesuai jumlah card aktif Anda: Kamar, Fasilitas, Perabotan)
    <div className="grid gap-4 px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-6">
      {/* Card Users (Dikomentari sesuai kode asli) */}
      {/* <Card>
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            {getCardValue(userLoading, userError, totalUsers)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            <IconUser className="size-4" />
          </div>
          <div className="text-muted-foreground">Total Pengguna Aplikasi</div>
        </CardFooter>
      </Card> */}

      {/* Card Kamar */}
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription>Total Kamar</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            {getCardValue(kamarLoading, kamarError, totalKamar)}
          </CardTitle>
          <CardAction>{/* Action/Badge jika diperlukan */}</CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            <IconBed className="size-4" />
          </div>
          <div className="text-muted-foreground">Total Kamar yang tersedia</div>
        </CardFooter>
      </Card>

      {/* Card Fasilitas */}
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription>Total Fasilitas</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            {getCardValue(fasilitasLoading, fasilitasError, totalFasilitas)}
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            <IconFridge className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total Fasilitas yang tersedia
          </div>
        </CardFooter>
      </Card>

      {/* Card Perabotan */}
      <Card className="bg-gradient-to-t from-primary/5 to-card shadow-xs">
        <CardHeader>
          <CardDescription>Total Perabotan</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            {getCardValue(perabotanLoading, perabotanError, totalPerabotan)}
          </CardTitle>
          <CardAction></CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            <IconArmchair className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total Perabotan yang tersedia
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
