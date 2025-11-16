import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service tampil data
export const GET = async() => {
     const data = await prisma.tb_perabotan.findMany({
          orderBy: {
                id: 'asc'
          }
    });

     return NextResponse.json({
          perabotan: data
     });
};

// buat service simpan data
export const POST = async (request: NextRequest) => {

     // buat dalam format json
     const data = await request.json();

     // mengecek apakah data perabotan sudah ada 
     const check = await prisma.tb_perabotan.findFirst({
          where: {
               namaPerabotan: data.namaPerabotan
          },
          select: {
               namaPerabotan: true
          }
     })

     // jika perabotan sudah ditemukan
     if (check) {
          return NextResponse.json({
               message: "Data Gagal Disimpan ! (Perabotan Sudah Ada)",
               success: false
          })
     }

     // jika perabotan tidak ditemukan
     await prisma.tb_perabotan.create({
          data: {
               namaPerabotan: data.namaPerabotan,
               kodePerabotan: data.kodePerabotan,
               deskripsi: data.deskripsi
          }
     });

    //  tampilkan respon
     return NextResponse.json({
          message: "Data Berhasil Disimpan !",
          success: true
     });
}