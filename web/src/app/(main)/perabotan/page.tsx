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

interface ModelPerabotan {
  id: number;
  namaPerabotan: string;
  kodePerabotan: string;
  deskripsi: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PerabotanPage() {
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/perabotan",
    fetcher
  );

  const deleteData = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/perabotan/${id}`
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
        <h1 className="text-xl font-semibold">Halaman Perabotan</h1>
        <nav className="flex space-x-4">
          <Link
            href="/perabotan/tambah"
            className="bg-sky-700 text-white py-2.5 px-5 rounded-full hover:bg-sky-800 text-sm flex items-center justify-center"
          >
            Tambah Perabotan
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
                <TableHead className="text-center w-[25%]">
                  Nama Perabotan
                </TableHead>
                <TableHead className="text-center w-[20%]">
                  Kode Perabotan
                </TableHead>
                <TableHead className="text-center w-[40%]">Deskripsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Mohon Tunggu...
                  </TableCell>
                </TableRow>
              ) : data && data.perabotan && data.perabotan.length > 0 ? (
                data.perabotan.map((item: ModelPerabotan) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      <Link href={`/perabotan/edit/${item.id}`}>
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
                              Perabotan: {item.namaPerabotan} akan dihapus?
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
                      {item.namaPerabotan}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.kodePerabotan}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.deskripsi}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
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
