import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import styles from "../user.module.css";

// buat interface
interface ModelUser {
  id: number;
  username: string;
  email: string;
  role: string;
  orders: number;
  riwayat_pembayaran: string;
}

export default function UserViewPage() {
  return (
    <>
      {/* bagian header ada di layout utama */}
      {/* tambah data */}

      {/* article */}
      <article className={styles.content}>
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow className="border-black">
              <TableHead className="text-center w-[20%] " >Username</TableHead>
              <TableHead className="text-center w-[20%]">Email</TableHead>
              <TableHead className="text-center w-[20%]">Role</TableHead>
              <TableHead className="text-center w-[20%]">Orders</TableHead>
              <TableHead className="text-center w-[20%]">Riwayat Pembayaran</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </article>
    </>
  );
}
