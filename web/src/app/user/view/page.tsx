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
import styles from "../user.module.css";
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

interface ModelUser {
  id: number;
  username: string;
  email: string;
  role: string;
  orders: number;
  riwayat_pembayaran: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UserViewPage() {
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/user",
    fetcher
  );

  // Debug: Lihat data yang diterima
  console.log("Data:", data);
  console.log("Error:", error);
  console.log("IsLoading:", isLoading);

  const deleteData = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/user/${id}`
      );

      if (response.data.success) {
        toast.success(response.data.message);
        mutate(); // Refresh data setelah delete
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Gagal menghapus data");
      console.error(error);
    }
  };

  return (
    <>
      <article className={styles.content}>
        {error ? (
          <div className="text-center text-black">
            Gagal Mengambil Data: {error.message}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[15%]">Aksi</TableHead>
                <TableHead className="text-center w-[15%]">Username</TableHead>
                <TableHead className="text-center w-[20%]">Email</TableHead>
                <TableHead className="text-center w-[15%]">Role</TableHead>
                <TableHead className="text-center w-[15%]">Orders</TableHead>
                <TableHead className="text-center w-[20%]">
                  Riwayat Pembayaran
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Mohon Tunggu...
                  </TableCell>
                </TableRow>
              ) : data && data.user && data.user.length > 0 ? (
                data.user.map((item: ModelUser) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      <button className={styles.btn_edit}>
                        <Pencil size={15} />
                      </button>

                      <AlertDialog>
                        <AlertDialogTrigger className={styles.btn_delete}>
                          <Trash size={15} color="white" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Apakah anda yakin ingin menghapus data ini?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Username: {item.username} ingin dihapus?
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
                      {item.username}
                    </TableCell>
                    <TableCell className="text-center">{item.email}</TableCell>
                    <TableCell className="text-center">{item.role}</TableCell>
                    <TableCell className="text-center">{item.orders}</TableCell>
                    <TableCell className="text-center">
                      {item.riwayat_pembayaran}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </article>
    </>
  );
}
