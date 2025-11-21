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

interface ModelFasilitas {
  id: number;
  namaFasilitas: string;
  kodeFasilitas: string;
  deskripsi: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FasilitasPage() {
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/fasilitas",
    fetcher
  );

  const deleteData = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/fasilitas/${id}`
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
      <nav className="mt-2.5 mx-5 flex md:justify-end sm:justify-start justify-center">
        <Link
          href="/fasilitas/tambah"
          className="bg-sky-700 text-white py-2.5 px-5 rounded-full hover:bg-sky-800"
        >
          Tambah Fasilitas
        </Link>
      </nav>

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
                  Nama Fasilitas
                </TableHead>
                <TableHead className="text-center w-[20%]">
                  Kode Fasilitas
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
              ) : data && data.fasilitas && data.fasilitas.length > 0 ? (
                data.fasilitas.map((item: ModelFasilitas) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      <Link href={`/fasilitas/edit/${item.id}`}>
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
                              Fasilitas: {item.namaFasilitas} akan dihapus?
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
                      {item.namaFasilitas}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.kodeFasilitas}
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
