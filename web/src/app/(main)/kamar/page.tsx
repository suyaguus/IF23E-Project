"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pencil, Trash, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/components/app-sidebar";
import { useKamar } from "@/hooks/useKamar";
import { kamarFetcher } from "@/lib/fetchers/kamarFetcher";
import { Kamar, StatusKamar } from "@/types/interfaces";

export default function KamarPage() {
  const { data: kamarList, isLoading, isError, mutate } = useKamar();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");

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
      toast.error("Gagal menghapus data");
    }
  };

  const getStatusBadge = (status: string | StatusKamar) => {
    const normalizedStatus = String(status)
      .toUpperCase()
      .replace(/_/g, "")
      .replace(/\s/g, "");
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
        color: "bg-slate-200 text-slate-700 border-slate-300",
        label: "Tidak Tersedia",
      };
    }
    return { color: "bg-gray-50 text-gray-500 border-gray-200", label: status };
  };

  const filteredData =
    kamarList?.filter(
      (item: Kamar) =>
        item.nomorKamar.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <main className="flex flex-col gap-4 pb-10 min-h-screen bg-gray-50/30">
      <AppSidebar />

      <header className="flex items-center justify-between px-5 pt-2 pb-1">
        <h1 className="text-[50px] font-bold tracking-tight leading-tight text-gray-900">
          Manajemen Kamar
        </h1>
      </header>

      <section className="px-5">
        <article className="text-muted-foreground text-lg">
          Ini adalah halaman manajemen kamar di aplikasi kost. Di halaman ini,
          Anda dapat melihat daftar kamar, menambah kamar baru, mengedit, dan
          menghapus data kamar.
        </article>
      </section>

      <section className="px-5 mt-4">
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nomor kamar atau deskripsi..."
                className="pl-9 bg-white"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                href="/kamar/tambah"
                className="bg-sky-700 text-white py-2.5 px-5 rounded-full hover:bg-sky-800 text-sm flex items-center justify-center transition-colors shadow-sm w-full sm:w-auto text-center"
              >
                Tambah Kamar
              </Link>
              <Link
                href="/dashboard/admin"
                className="bg-white border border-gray-300 text-gray-700 py-2.5 px-5 rounded-full hover:bg-gray-50 text-sm flex items-center justify-center transition-colors shadow-sm w-full sm:w-auto text-center"
              >
                Kembali
              </Link>
            </div>
          </div>

          <div className="p-0">
            {isError ? (
              <div className="text-center text-red-500 py-10 bg-red-50/50 m-4 rounded-md">
                Gagal Mengambil Data. Pastikan server berjalan.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                    <TableHead className="text-center w-[50px]">No</TableHead>
                    <TableHead className="text-center w-[15%]">Aksi</TableHead>
                    <TableHead className="w-[15%]">Nomor Kamar</TableHead>
                    <TableHead className="w-[20%]">
                      Harga Sewa Bulanan
                    </TableHead>
                    <TableHead className="text-center w-[15%]">
                      Status Kamar
                    </TableHead>
                    <TableHead className="w-[30%]">Deskripsi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-32">
                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                          <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                          Memuat data...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : currentItems.length > 0 ? (
                    currentItems.map((item: Kamar, index: number) => {
                      const badge = getStatusBadge(item.statusKamar);
                      const rowNumber = indexOfFirstItem + index + 1;

                      return (
                        <TableRow
                          key={item.id}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <TableCell className="text-center text-muted-foreground font-medium">
                            {rowNumber}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Link href={`/kamar/edit/${item.id}`}>
                                <button
                                  className="bg-white border border-gray-200 hover:bg-gray-100 text-yellow-600 p-2 rounded-md transition-colors shadow-sm"
                                  title="Edit"
                                >
                                  <Pencil size={16} />
                                </button>
                              </Link>

                              <AlertDialog>
                                <AlertDialogTrigger
                                  className="bg-white border border-gray-200 hover:bg-red-50 text-red-600 p-2 rounded-md transition-colors shadow-sm"
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
                                      <b>{item.nomorKamar}</b>? Data yang
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
                          <TableCell className="font-semibold text-gray-900">
                            {item.nomorKamar}
                          </TableCell>
                          <TableCell>
                            Rp {Number(item.hargaSewa).toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}
                            >
                              {badge.label}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm truncate max-w-[250px]">
                            {item.deskripsi}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center h-32 text-muted-foreground"
                      >
                        Tidak ada data kamar ditemukan.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          {!isLoading && totalItems > 0 && (
            <div className="flex items-center justify-between px-4 py-4 border-t bg-gray-50/30">
              <div className="text-sm text-muted-foreground">
                Menampilkan <b>{indexOfFirstItem + 1}</b> -{" "}
                <b>{Math.min(indexOfLastItem, totalItems)}</b> dari{" "}
                <b>{totalItems}</b> data
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium px-2">
                  Halaman {currentPage} / {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
