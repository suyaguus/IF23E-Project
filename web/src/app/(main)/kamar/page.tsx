"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Link from "next/link";
import { useKamar } from "@/hooks/useKamar";
import { kamarFetcher } from "@/lib/fetchers/kamarFetcher";
import { Kamar, StatusKamar } from "@/types/interfaces";
import { AppSidebar } from "@/components/app-sidebar";

export default function KamarPage() {
  const { data: kamarList, isLoading, isError, mutate } = useKamar();

  const handleDelete = async (id: number) => {
    try {
      const result = await kamarFetcher.deleteKamar(id);
      if (result.success) {
        toast.success(result.message || "Data berhasil dihapus");
      } else {
        toast.success("Data berhasil dihapus");
      }
      mutate();
    } catch (error: unknown) {
      console.error("Gagal menghapus:", error);
      const errMsg =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Gagal menghapus data";
      toast.error(errMsg);
    }
  };

  // --- HELPER WARNA & TEXT ---
  const getStatusBadge = (status: string | StatusKamar) => {
    const normalizedStatus = String(status)
      .toUpperCase()
      .replace(/_/g, "")
      .replace(/\s/g, "");

    // 2. Cek Kondisi
    if (normalizedStatus === "TERSEDIA") {
      return {
        color: "bg-green-100 text-green-700 border-green-200",
        label: "Tersedia",
      };
    } else if (normalizedStatus === "TERSEWA") {
      return {
        color: "bg-red-100 text-red-700 border-red-200",
        label: "Tersewa",
      };
    } else if (normalizedStatus === "TIDAKTERSEDIA") {
      return {
        color: "bg-slate-200 text-slate-700 border-slate-300", // Abu-abu lebih gelap sedikit biar terlihat
        label: "Tidak Tersedia",
      };
    }

    // Default (Jika status tidak dikenali)
    return {
      color: "bg-gray-50 text-gray-500 border-gray-200",
      label: status,
    };
  };

  return (
    <div>
      <AppSidebar />
      <section className="flex items-center justify-between px-5 py-2">
        <h1 className="text-xl font-semibold">Halaman Kamar</h1>
        <nav className="flex space-x-4">
          <Link
            href="/kamar/tambah"
            className="bg-sky-700 text-white py-2.5 px-5 rounded-full hover:bg-sky-800 text-sm flex items-center justify-center transition-colors"
          >
            Tambah Kamar
          </Link>
          <Link
            href="/dashboard/admin"
            className="bg-sky-700 text-white py-2.5 px-5 rounded-full hover:bg-sky-800 text-sm flex items-center justify-center transition-colors"
          >
            Kembali
          </Link>
        </nav>
      </section>

      <article className="p-4">
        {isError ? (
          <div className="text-center text-red-500 py-10 bg-red-50 rounded-md">
            Gagal Mengambil Data. Pastikan server berjalan.
          </div>
        ) : (
          <div className="border rounded-md shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center w-[15%]">Aksi</TableHead>
                  <TableHead className="text-center w-[15%]">
                    Nomor Kamar
                  </TableHead>
                  <TableHead className="text-center w-[20%]">
                    Harga Sewa Bulanan
                  </TableHead>
                  <TableHead className="text-center w-[20%]">
                    Status Kamar
                  </TableHead>
                  <TableHead className="text-center w-[30%]">
                    Deskripsi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Mohon Tunggu...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : kamarList && kamarList.length > 0 ? (
                  kamarList.map((item: Kamar) => {
                    // Ambil config warna & label
                    const badge = getStatusBadge(item.statusKamar);

                    return (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link href={`/kamar/edit/${item.id}`}>
                              <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition-colors"
                                title="Edit"
                              >
                                <Pencil size={16} />
                              </button>
                            </Link>

                            <AlertDialog>
                              <AlertDialogTrigger
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors"
                                title="Hapus"
                              >
                                <Trash size={16} />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Konfirmasi Hapus
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus{" "}
                                    <b>Kamar {item.nomorKamar}</b>? Data yang
                                    dihapus tidak dapat dikembalikan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {item.nomorKamar}
                        </TableCell>
                        <TableCell className="text-center">
                          Rp {Number(item.hargaSewa).toLocaleString("id-ID")}
                        </TableCell>

                        {/* KOLOM STATUS DENGAN WARNA BARU */}
                        <TableCell className="text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        </TableCell>

                        <TableCell className="text-center text-muted-foreground text-sm truncate max-w-[200px]">
                          {item.deskripsi}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center h-24 text-muted-foreground"
                    >
                      Tidak ada data kamar ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </article>
    </div>
  );
}
