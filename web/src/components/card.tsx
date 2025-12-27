"use client";

import React from "react";
import { IconBed, IconFridge, IconArmchair } from "@tabler/icons-react";

// Imports UI Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { AppSidebar } from "@/components/app-sidebar";

// Imports Hooks (Menggunakan hook yang sudah kita buat sebelumnya)
import { useKamar } from "@/hooks/useKamar";
import { useFasilitas } from "@/hooks/useFasilitas";
import { usePerabotan } from "@/hooks/usePerabotan";

export default function Cards() {
  // 1. Ambil Data menggunakan Custom Hooks
  // Hook ini otomatis menangani caching, loading, dan error
  const { data: dataKamar, isLoading: loadingKamar } = useKamar();
  const { data: dataFasilitas, isLoading: loadingFasilitas } = useFasilitas();
  const { data: dataPerabotan, isLoading: loadingPerabotan } = usePerabotan();

  // 2. Helper untuk menghitung total (Safety check array)
  const totalKamar = Array.isArray(dataKamar) ? dataKamar.length : 0;
  const totalFasilitas = Array.isArray(dataFasilitas)
    ? dataFasilitas.length
    : 0;
  const totalPerabotan = Array.isArray(dataPerabotan)
    ? dataPerabotan.length
    : 0;

  // Helper untuk menampilkan angka (Loading state)
  const showValue = (loading: boolean, value: number) => {
    return loading ? "..." : value;
  };

  return (
    <div className="flex flex-col gap-2 pb-10 min-h-screen bg-gray-50/30">
      <AppSidebar />

      {/* --- HEADER SECTION (Judul Besar) --- */}
      <section className="flex items-center justify-between px-5 pt-2 pb-1">
        <h1 className="text-[50px] font-bold tracking-tight leading-tight text-gray-900">
          Dashboard Admin
        </h1>
      </section>

      {/* --- DESCRIPTION SECTION (Article) --- */}
      <section className="px-5">
        <article className="text-muted-foreground text-lg">
          Selamat datang kembali di panel administrasi. Di sini Anda dapat
          memantau ringkasan jumlah kamar, fasilitas, dan perabotan yang
          terdaftar dalam sistem pengelolaan kost.
        </article>
      </section>

      {/* --- CARDS SECTION --- */}
      <section className="px-5 mt-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Card Kamar */}
          <Card className="bg-gradient-to-t from-blue-50/50 to-white shadow-sm border-blue-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-600 font-medium">
                Total Kamar
              </CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums text-gray-800">
                {showValue(loadingKamar, totalKamar)}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center gap-3 pt-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <IconBed className="size-5" />
              </div>
              <div className="text-sm text-muted-foreground">
                Unit kamar terdaftar
              </div>
            </CardFooter>
          </Card>

          {/* 2. Card Fasilitas */}
          <Card className="bg-gradient-to-t from-emerald-50/50 to-white shadow-sm border-emerald-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="text-emerald-600 font-medium">
                Total Fasilitas
              </CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums text-gray-800">
                {showValue(loadingFasilitas, totalFasilitas)}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center gap-3 pt-2">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <IconFridge className="size-5" />
              </div>
              <div className="text-sm text-muted-foreground">
                Jenis fasilitas tersedia
              </div>
            </CardFooter>
          </Card>

          {/* 3. Card Perabotan */}
          <Card className="bg-gradient-to-t from-orange-50/50 to-white shadow-sm border-orange-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="text-orange-600 font-medium">
                Total Perabotan
              </CardDescription>
              <CardTitle className="text-4xl font-bold tabular-nums text-gray-800">
                {showValue(loadingPerabotan, totalPerabotan)}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center gap-3 pt-2">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <IconArmchair className="size-5" />
              </div>
              <div className="text-sm text-muted-foreground">
                Item inventaris tercatat
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
