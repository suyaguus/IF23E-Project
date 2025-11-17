import {
  Table,
  TableBody,
  TableCaption,
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

// buat interface
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
  // swr digunakan untuk mengambil data
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/user",
    fetcher
  );

  const deleteData = async (id: number) => {
    const response = await axios.delete(
      `http://localhost:3001/api/user/${id}`
    );

    // tampilkan hasil respon
    // console.log(response.data.message);

    // jika sukses == true
    if (response.data.success) {
      toast.success(response.data.message);
    }

    // jika sukses == false
    else {
      toast.error(response.data.message);
    }

    mutate(data);
  };

  // bagian tampilan
  return (
    <>
      {/* bagian header ada di layout utama */}
      {/* tambah data */}

      {/* article */}
      <article className={styles.content}>
        {/* bagian error menggunakan ternary Operator */}
        {error ? (
          <div className="text-center text-black">Gagal Mengambil Data</div>
        ) : (
          <Table>
            <TableHeader>
              {/* bagian desain table #1*/}
              <TableRow>
                <TableHead className="text-center w-[10%] ">Aksi</TableHead>
                <TableHead className="text-center w-[10%] ">
                  Kode Barang
                </TableHead>
                <TableHead className="text-center w-auto ">
                  Nama Barang
                </TableHead>
                <TableHead className="text-center w-[15%] ">
                  Harga Barang
                </TableHead>
                <TableHead className="text-center w-[15%] ">Satuan</TableHead>
              </TableRow>

              {/* bagian desain table #2*/}
              {/* <TableRow>
          <TableHead className="text-center">#</TableHead>
          <TableHead className="text-center">#</TableHead>
          <TableHead className="text-center">#</TableHead>
          <TableHead className="text-center">#</TableHead>
          <TableHead className="text-center">#</TableHead>
        </TableRow> */}
            </TableHeader>
            <TableBody>
              {/* bagian data */}
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Mohon Tunggu
                  </TableCell>
                </TableRow>
              ) : (
                data &&
                data.user.map((item: ModelUser) => (
                  // <div key={item.id}>
                  //   <p>{item.nama}</p>
                  // </div>
                  <TableRow key={item.id}>
                    <TableCell className="text-center bg-red-200">
                      {/* buat tombol edit */}
                      <button className={styles.btn_edit}>
                        <Pencil size={15} />
                      </button>

                      {/* buat tombol hapus */}
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
                              Nama barang : {item.username} ingin dihapus ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Tidak</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteData(item.id);
                              }}
                            >
                              Ya
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell className="bg-purple-300">
                      {item.username}
                    </TableCell>
                    <TableCell className="bg-red-200">{item.email}</TableCell>
                    <TableCell className="bg-red-200">{item.role}</TableCell>
                    <TableCell className="bg-red-200">{item.orders}</TableCell>
                    <TableCell className="bg-red-200">
                      {item.riwayat_pembayaran}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </article>
    </>
  );
}
