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
import useSWR from "swr";
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
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";

interface ModelKamar {
  id: number;
  nomorKamar: string;
  hargaSewa: number;
  statusKamar: string;
  deskripsi: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function KamarPage() {
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/kamar",
    fetcher
  );

  const deleteData = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/kamar/${id}`
      );

      if (response.data.success) {
        toast.success(response.data.message);
        mutate();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Gagal menghapus data");
      console.error(error);
    }
  };

  return (
    <div>
      <section className="flex items-center justify-between px-5 py-2">
        <h1 className="text-xl font-semibold">Halaman Kamar</h1>
        <nav className="flex space-x-4">
          <Link
            href="/kamar/tambah"
            className="bg-sky-700 text-white py-2.5 px-5 rounded-full hover:bg-sky-800 text-sm flex items-center justify-center"
          >
            Tambah Kamar
          </Link>
          <Link
            href="/"
            className="bg-sky-700 text-white py-2.5 px-5 rounded-full hover:bg-sky-800 text-sm flex items-center justify-center"
          >
            Kembali
          </Link>
        </nav>
      </section>

      <article className="p-4">
        {error ? (
          <div className="text-center text-red-500">
            Gagal Mengambil Data: {error.message}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[15%]">Aksi</TableHead>
                <TableHead className="text-center w-[20%]">
                  Nomor Kamar
                </TableHead>
                <TableHead className="text-center w-[20%]">
                  Harga Sewa
                </TableHead>
                <TableHead className="text-center w-[20%]">
                  Status Kamar
                </TableHead>
                <TableHead className="text-center w-[25%]">Deskripsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Mohon Tunggu...
                  </TableCell>
                </TableRow>
              ) : data && data.kamar && data.kamar.length > 0 ? (
                data.kamar.map((item: ModelKamar) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      <Link href={`/kamar/edit/${item.id}`}>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded mr-2">
                          <Pencil size={15} />
                        </button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                          <Trash size={15} color="white" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Apakah anda yakin ingin menghapus data ini?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Kamar Nomor: {item.nomorKamar} akan dihapus?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Tidak</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteData(item.id)}
                            >
                              Ya
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.nomorKamar}
                    </TableCell>
                    <TableCell className="text-center">
                      Rp {item.hargaSewa.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.statusKamar}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.deskripsi}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </article>
    </div>
  );
}
