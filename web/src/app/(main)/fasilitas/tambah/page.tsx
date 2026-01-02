"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

// Imports Components shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Imports Logic & Layout
import { fasilitasFetcher } from "@/lib/fetchers/fasilitasFetcher";
import { AppSidebar } from "@/components/app-sidebar";

// 1. Definisikan Schema Validasi
const formSchema = z.object({
  namaFasilitas: z.string().min(1, "Nama fasilitas wajib diisi"),
  kodeFasilitas: z.string().min(1, "Kode fasilitas wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});

export default function TambahFasilitasPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 2. Setup Form Hook
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaFasilitas: "",
      kodeFasilitas: "",
      deskripsi: "",
    },
  });

  // 3. Handle Submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await fasilitasFetcher.createFasilitas(values);

      if (result.success) {
        toast.success("Berhasil!", {
          description: (
            <span className="text-white font-medium">
              Fasilitas {values.namaFasilitas} berhasil ditambahkan.
            </span>
          ),
        });
        router.push("/fasilitas");
        router.refresh();
      } else {
        toast.error("Gagal", {
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

  return (
    <div className="flex flex-col gap-2 pb-10 min-h-screen bg-gray-50/30">
      <AppSidebar />

      {/* --- HEADER SECTION --- */}
      <section className="flex items-center justify-between px-5 pt-2 pb-1">
        <h1 className="text-[50px] font-bold tracking-tight leading-tight text-gray-900">
          Tambah Fasilitas
        </h1>
        <nav>
          <Link
            href="/fasilitas"
            className="bg-white border border-gray-300 text-gray-700 py-2.5 px-5 rounded-full hover:bg-gray-50 text-sm flex items-center justify-center transition-colors shadow-sm font-medium"
          >
            Kembali
          </Link>
        </nav>
      </section>

      {/* --- DESCRIPTION SECTION --- */}
      <section className="px-5">
        <p className="text-muted-foreground text-lg">
          Silakan isi formulir di bawah ini untuk menambahkan fasilitas baru ke
          dalam sistem. Pastikan kode fasilitas unik untuk memudahkan
          identifikasi.
        </p>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="px-5 mt-4">
        <div className="mx-auto w-full max-w-3xl">
          <Card className="bg-white border rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Formulir Data Fasilitas</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Field 1: Nama Fasilitas */}
                  <FormField
                    control={form.control}
                    name="namaFasilitas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Fasilitas</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contoh: WiFi, AC, TV"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Field 2: Kode Fasilitas */}
                  <FormField
                    control={form.control}
                    name="kodeFasilitas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kode Fasilitas</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: FAS-001" {...field} />
                        </FormControl>
                        <FormDescription>
                          Kode unik untuk identifikasi fasilitas (tidak boleh
                          sama).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Field 3: Deskripsi */}
                  <FormField
                    control={form.control}
                    name="deskripsi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jelaskan detail fasilitas..."
                            className="resize-none h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 pt-4 border-t mt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => router.back()}
                      disabled={isLoading}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-sky-700 hover:bg-sky-800 text-white"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Simpan Data
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
