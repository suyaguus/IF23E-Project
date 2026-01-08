import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Ambil Semua Data
export const GET = async () => {
     try {
          const data = await prisma.tb_perabotan.findMany(
               {
                    orderBy: {
                         id: "asc"
                    }
               }
          );

          return NextResponse.json(
               {
                    data: data
               },
               {
                    status: 200
               }
          );
     } catch (error) {
          return NextResponse.json(
               {
                    message: "Gagal mengambil data",
                    success: false
               },
               {
                    status: 500
               }
          );
     }
};

// POST: Tambah Data Baru
export const POST = async (request: NextRequest) => {
     try {
          const dataInput = await request.json();

          if (!dataInput.namaPerabotan || !dataInput.kodePerabotan) {
               return NextResponse.json(
                    {
                         message: "Nama dan Kode wajib diisi",
                         success: false
                    },
                    {
                         status: 400
                    }
               );
          }

          const check = await prisma.tb_perabotan.findFirst(
               {
                    where: {
                         OR: [
                              { namaPerabotan: dataInput.namaPerabotan },
                              { kodePerabotan: dataInput.kodePerabotan }
                         ]
                    }
               }
          );

          if (check) {
               return NextResponse.json(
                    {
                         message: "Data Perabotan sudah ada!",
                         success: false
                    },
                    {
                         status: 400
                    }
               );
          }

          const newData = await prisma.tb_perabotan.create(
               {
                    data: {
                         namaPerabotan: dataInput.namaPerabotan,
                         kodePerabotan: dataInput.kodePerabotan,
                         deskripsi: dataInput.deskripsi || "",
                    }
               }
          );

          return NextResponse.json(
               {
                    message: "Data Berhasil Disimpan!",
                    data: newData,
                    success: true
               },
               {
                    status: 201
               }
          );
     } catch (error) {
          console.error(error);
          return NextResponse.json(
               {
                    message: "Terjadi kesalahan server",
                    success: false
               },
               {
                    status: 500
               }
          );
     }
};