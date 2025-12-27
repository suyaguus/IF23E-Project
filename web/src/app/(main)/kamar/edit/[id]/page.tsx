"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ChevronLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

// Imports Components shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Imports Logic
import { kamarFetcher } from "@/lib/fetchers/kamarFetcher";
import { StatusKamar } from "@/types/interfaces"; // Pastikan Enum ini sudah benar (TERSEDIA, dll)
import { formatRibuan, filterHarga } from "@/lib/scripts";
import { AppSidebar } from "@/components/app-sidebar";

// 1. Definisikan Schema Validasi
const formSchema = z.object({
  nomorKamar: z.string().min(1, "Nomor kamar wajib diisi"),
  hargaSewa: z.coerce.number().min(1, "Harga sewa tidak boleh 0"),
  statusKamar: z.nativeEnum(StatusKamar),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});

export default function EditKamarPage() {
  const router = useRouter();
  const params = useParams(); // Hook untuk ambil ID dari URL

  // Ambil ID dan pastikan konversi aman
  const idKamar = params?.id ? Number(params.id) : null;

  const [isLoading, setIsLoading] = useState(false); // Loading saat Simpan
  const [isFetching, setIsFetching] = useState(true); // Loading saat Ambil Data Awal

  // 2. Setup Form Hook
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomorKamar: "",
      hargaSewa: 0,
      statusKamar: StatusKamar.Tersedia,
      deskripsi: "",
    },
  });

  // 3. Fetch Data Saat Halaman Dibuka (useEffect)
  useEffect(() => {
    const fetchData = async () => {
      if (!idKamar) return;

      try {
        const result = await kamarFetcher.getKamarById(idKamar);

        if (result.success && result.data) {
          const dataDB = result.data;

          // --- LOGIC NORMALISASI STATUS ---
          // Kita pastikan string dari DB cocok dengan ENUM Frontend
          let normalizedStatus = StatusKamar.Tersedia; // Default

          if (dataDB.statusKamar) {
            // Ubah jadi huruf besar & buang spasi/underscore untuk pencocokan fleksibel
            const rawStatus = String(dataDB.statusKamar)
              .toUpperCase()
              .replace(/_/g, "")
              .replace(/\s/g, "");

            // Cek kondisi
            if (rawStatus === "TERSEWA") {
              normalizedStatus = StatusKamar.Tersewa;
            } else if (rawStatus === "TIDAKTERSEDIA") {
              normalizedStatus = StatusKamar.TidakTersedia;
            } else {
              normalizedStatus = StatusKamar.Tersedia;
            }
          }
          // --------------------------------

          // Reset form dengan data yang sudah dinormalisasi
          form.reset({
            nomorKamar: dataDB.nomorKamar,
            hargaSewa: Number(dataDB.hargaSewa),
            statusKamar: normalizedStatus, // Gunakan status yang sudah "bersih"
            deskripsi: dataDB.deskripsi,
          });
        } else {
          toast.error("Gagal mengambil data", {
            description: "Data kamar tidak ditemukan.",
          });
          router.push("/kamar");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error Sistem", { description: "Gagal memuat data kamar" });
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [idKamar, router, form]);

  // 4. Handle Submit (Update)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!idKamar) return;

    setIsLoading(true);
    try {
      const result = await kamarFetcher.updateKamar(idKamar, values);

      if (result.success) {
        toast.success("Berhasil Update!", {
          description: (
            <span className="text-white font-medium">
              Data kamar berhasil diperbarui.
            </span>
          ),
        });
        router.push("/kamar");
        router.refresh(); // Refresh agar data di tabel terupdate
      } else {
        toast.error("Gagal Update", {
          description: <span className="text-white">{result.message}</span>,
        });
      }
    } catch (error: unknown) {
      console.error(error);
      const errMsg =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Terjadi kesalahan sistem";

      toast.error("Error", {
        description: <span className="text-white">{errMsg}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Tampilan Loading saat Fetching Data
  if (isFetching) {
    return (
      <div className="flex flex-col gap-4 p-4 h-screen">
        <AppSidebar />
        <div className="flex flex-1 items-center justify-center flex-col gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-sky-700" />
          <p className="text-muted-foreground text-sm">Memuat data kamar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <AppSidebar />
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/kamar">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Edit Kamar</h1>
      </div>

      {/* Form Card */}
      <div className="mx-auto w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Edit Informasi Kamar</CardTitle>
            <CardDescription>
              Ubah detail kamar. Pastikan nomor kamar tidak duplikat dengan
              kamar lain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Field 1: Nomor Kamar */}
                <FormField
                  control={form.control}
                  name="nomorKamar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Kamar</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: 101, A-01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field 2: Harga Sewa */}
                <FormField
                  control={form.control}
                  name="hargaSewa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga Sewa (Rp)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="500.000"
                          {...field}
                          value={
                            field.value
                              ? formatRibuan(field.value.toString())
                              : ""
                          }
                          maxLength={15}
                          onChange={(e) => {
                            const rawInput = e.target.value;
                            const cleanValue = filterHarga(rawInput);
                            field.onChange(Number(cleanValue));
                          }}
                        />
                      </FormControl>
                      <FormDescription>Per bulan</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field 3: Status Kamar */}
                {/* Field 3: Status Kamar */}
                <FormField
                  control={form.control}
                  name="statusKamar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Kamar</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value} // <--- WAJIB ADA agar nilai tampil!
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* Pastikan value ini adalah Enum (TERSEDIA, TERSEWA, dll) */}
                          <SelectItem value={StatusKamar.Tersedia}>
                            Tersedia
                          </SelectItem>
                          <SelectItem value={StatusKamar.Tersewa}>
                            Tersewa
                          </SelectItem>
                          <SelectItem value={StatusKamar.TidakTersedia}>
                            Tidak Tersedia
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Field 4: Deskripsi */}
                <FormField
                  control={form.control}
                  name="deskripsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi & Fasilitas</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Jelaskan kondisi kamar..."
                          className="resize-none h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => router.back()}
                    disabled={isLoading}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Perubahan
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
