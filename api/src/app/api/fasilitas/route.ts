import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service tampil data
export const GET = async() => {
    const data = await prisma.tb_fasilitas.findMany({
        orderBy: {
            id: 'asc'
        }
    })

    return NextResponse.json({
        fasilitas: data
    })
};

// buat service simpan data
export const POST = async (request: NextRequest) => {

    // buat fungsi dalam format json
    const data = await request.json();

    // mengecek apakah data fasilitas sudah ada 
    const check = await prisma.tb_fasilitas.findFirst({
        where: {
            namaFasilitas: data.namaFasilitas
        },
        select: {
            namaFasilitas: true
        }
    })

    // jika faslitias sudah ditemukan
    if (check) {
        return NextResponse.json({
            message: "Data Gagal Disimpan ! (Fasilitas Sudah Ada)",
            success: false
        })
    }

    // jika fasilitas tidak ditemukan
    await prisma.tb_fasilitas.create({
        data: {
            namaFasilitas: data.namaFasilitas,
            deskripsi: data.deskripsi
        }
    })

    // tampilkan respon
    return NextResponse.json({
        message: "Data Berhasil Disimpan !",
        success: true
    })
}