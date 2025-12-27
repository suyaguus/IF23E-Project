"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Pencil, Trash, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { toast } from "sonner";

// UI Components
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

// Logic & Types
import { usePerabotan } from "@/hooks/usePerabotan";
import { perabotanFetcher } from "@/lib/fetchers/perabotanFetcher";
import { Perabotan } from "@/types/interfaces";

export default function PerabotanPage() {
  // 1. Gunakan Hook Custom
  const { data: listPerabotan, isLoading, isError, mutate } = usePerabotan();

  // --- STATE PAGINATION & SEARCH ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah data per halaman
  const [searchTerm, setSearchTerm] = useState("");

  // --- LOGIC DELETE ---
  const handleDelete = async (id: number) => {
    try {
      const result = await perabotanFetcher.deletePerabotan(id);

      if (result.success) {
        toast.success(result.message || "Berhasil dihapus");
        mutate(); // Refresh data otomatis
      } else {
        toast.error(result.message || "Gagal menghapus");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
      console.error(error);
    }
  };

  // --- LOGIC FILTER & PAGINATION ---
  const filteredData =
    listPerabotan?.filter(
      (item: Perabotan) =>
        item.namaPerabotan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kodePerabotan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handler Pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-2 pb-10 min-h-screen bg-gray-50/30">
      <AppSidebar />

      {/* --- HEADER SECTION --- */}
      <section className="flex items-center justify-between px-5 pt-2 pb-1">
        <h1 className="text-[50px] font-bold tracking-tight leading-tight text-gray-900">
          Manajemen Perabotan
        </h1>
      </section>

      {/* --- DESCRIPTION SECTION --- */}
      <section className="px-5">
        <p className="text-muted-foreground text-lg">
          Kelola data inventaris perabotan kost (seperti Kasur, Lemari, Meja, dll). 
          Anda dapat menambah, mengubah, dan menghapus data perabotan di sini.
        </p>
      </section>

      {/* --- MAIN TABLE SECTION --- */}
      <section className="px-5 mt-4">
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          
          {/* Toolbar Pencarian & Tombol Aksi */}
          <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
            {/* Bagian Kiri: Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, kode, atau deskripsi..."
                className="pl-9 bg-white"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Bagian Kanan: Tombol Tambah & Kembali */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link
                href="/perabotan/tambah"
                className="bg-sky-700 text-white py-2.5 px-5 rounded-full hover:bg-sky-800 text-sm flex items-center justify-center transition-colors shadow-sm w-full sm:w-auto text-center font-medium"
              >
                Tambah Perabotan
              </Link>
              <Link
                href="/dashboard/admin"
                className="bg-white border border-gray-300 text-gray-700 py-2.5 px-5 rounded-full hover:bg-gray-50 text-sm flex items-center justify-center transition-colors shadow-sm w-full sm:w-auto text-center font-medium"
              >
                Kembali
              </Link>
            </div>
          </div>

          {/* Tabel Data */}
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
                    <TableHead className="w-[25%]">Nama Perabotan</TableHead>
                    <TableHead className="text-center w-[20%]">Kode Perabotan</TableHead>
                    <TableHead className="w-[35%]">Deskripsi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-32">
                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                          <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                          Memuat data...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : currentItems.length > 0 ? (
                    currentItems.map((item: Perabotan, index: number) => {
                      // Hitung nomor urut
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
                              <Link href={`/perabotan/edit/${item.id}`}>
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
                                      Apakah Anda yakin ingin menghapus perabotan{" "}
                                      <b>{item.namaPerabotan}</b>?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-red-600 hover:bg-red-700"
                                      onClick={() => handleDelete(item.id)}
                                    >
                                      Ya, Hapus
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-gray-900">
                            {item.namaPerabotan}
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="bg-slate-100 px-2 py-1 rounded text-xs font-mono font-medium border border-slate-200">
                              {item.kodePerabotan}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm truncate max-w-[300px]">
                            {item.deskripsi}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center h-32 text-muted-foreground"
                      >
                        Tidak ada data perabotan ditemukan.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          {/* --- FOOTER PAGINATION --- */}
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