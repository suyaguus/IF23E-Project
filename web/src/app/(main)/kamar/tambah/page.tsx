"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { kamarFetcher } from "@/lib/fetchers/kamarFetcher";
import { StatusKamar } from "@/types/interfaces";
import { formatRibuan, filterHarga } from "@/lib/scripts";
import { AppSidebar } from "@/components/app-sidebar";

const formSchema = z.object({
  nomorKamar: z.string().min(1, "Nomor kamar wajib diisi"),
  hargaSewa: z.coerce.number().min(1, "Harga sewa tidak boleh 0"),
  statusKamar: z.nativeEnum(StatusKamar),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});

export default function TambahKamarPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomorKamar: "",
      hargaSewa: 0,
      statusKamar: StatusKamar.Tersedia,
      deskripsi: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await kamarFetcher.createKamar(values);

      if (result.success) {
        toast.success("Berhasil!", {
          description: (
            <span className="text-white font-medium">
              {values.nomorKamar} berhasil ditambahkan.
            </span>
          ),
        });
        router.push("/kamar");
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

      <section className="flex items-center justify-between px-5 pt-2 pb-1">
        <h1 className="text-[50px] font-bold tracking-tight leading-tight text-gray-900">
          Tambah Kamar
        </h1>
        <nav>
          <Link
            href="/kamar"
            className="bg-white border border-gray-300 text-gray-700 py-2.5 px-5 rounded-full hover:bg-gray-50 text-sm flex items-center justify-center transition-colors shadow-sm font-medium"
          >
            Kembali
          </Link>
        </nav>
      </section>

      <section className="px-5">
        <p className="text-muted-foreground text-lg">
          Silakan isi formulir di bawah ini untuk menambahkan kamar baru ke
          dalam sistem. Pastikan nomor kamar unik (tidak ganda) dan isi semua
          data dengan benar.
        </p>
      </section>

      <section className="px-5 mt-4">
        <div className="mx-auto w-full max-w-3xl">
          <Card className="bg-white border rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Formulir Data Kamar</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                            maxLength={10}
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

                  <FormField
                    control={form.control}
                    name="statusKamar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status Kamar</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
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

                  <FormField
                    control={form.control}
                    name="deskripsi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi & Fasilitas</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jelaskan kondisi kamar, letak, atau catatan khusus..."
                            className="resize-none h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
