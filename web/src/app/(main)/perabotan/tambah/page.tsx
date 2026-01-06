"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
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
import { perabotanFetcher } from "@/lib/fetchers/perabotanFetcher";
import { AppSidebar } from "@/components/app-sidebar";

const formSchema = z.object({
  namaPerabotan: z.string().min(1, "Nama perabotan wajib diisi"),
  kodePerabotan: z.string().min(1, "Kode perabotan wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
});

export default function TambahPerabotanPage() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaPerabotan: "",
      kodePerabotan: "",
      deskripsi: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await perabotanFetcher.createPerabotan(values);

      if (result.success) {
        toast.success("Berhasil!", {
          description: (
            <span className="text-white font-medium">
              Perabotan {values.namaPerabotan} berhasil ditambahkan.
            </span>
          ),
        });
        mutate("/perabotan");
        router.push("/perabotan");
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
          Tambah Perabotan
        </h1>
        <nav>
          <Link
            href="/perabotan"
            className="bg-white border border-gray-300 text-gray-700 py-2.5 px-5 rounded-full hover:bg-gray-50 text-sm flex items-center justify-center transition-colors shadow-sm font-medium"
          >
            Kembali
          </Link>
        </nav>
      </section>

      <section className="px-5">
        <p className="text-muted-foreground text-lg">
          Silakan isi formulir di bawah ini untuk menambahkan data perabotan
          baru (inventaris) ke dalam sistem. Pastikan kode perabotan unik.
        </p>
      </section>

      <section className="px-5 mt-4">
        <div className="mx-auto w-full max-w-3xl">
          <Card className="bg-white border rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Formulir Data Perabotan</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="namaPerabotan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Perabotan</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contoh: Kasur Single, Lemari Kayu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="kodePerabotan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kode Perabotan</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: PRB-001" {...field} />
                        </FormControl>
                        <FormDescription>
                          Kode unik untuk identifikasi barang inventaris.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deskripsi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jelaskan kondisi atau spesifikasi perabotan..."
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
