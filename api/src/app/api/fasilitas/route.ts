import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Ambil Semua Data
export const GET = async () => {
    try {
        const data = await prisma.tb_fasilitas.findMany({
            orderBy: { id: "asc" },
        });

        return NextResponse.json(
            {
                fasilitas: data,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Gagal mengambil data fasilitas", success: false },
            { status: 500 }
        );
    }
};

// POST: Tambah Data Baru
export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();

        if (!data.namaFasilitas || !data.kodeFasilitas) {
            return NextResponse.json(
                { message: "Nama dan Kode Fasilitas wajib diisi", success: false },
                { status: 400 }
            );
        }

        const check = await prisma.tb_fasilitas.findFirst({
            where: {
                OR: [
                    { kodeFasilitas: data.kodeFasilitas },
                    { namaFasilitas: data.namaFasilitas }
                ]
            },
            select: { id: true },
        });

        if (check) {
            return NextResponse.json(
                { message: "Fasilitas dengan nama atau kode tersebut sudah ada!", success: false },
                { status: 400 }
            );
        }

        // 3. Simpan ke DB
        const newData = await prisma.tb_fasilitas.create({
            data: {
                namaFasilitas: data.namaFasilitas,
                kodeFasilitas: data.kodeFasilitas,
                deskripsi: data.deskripsi || "",
            },
        });

        return NextResponse.json(
            { message: "Fasilitas Berhasil Disimpan!", data: newData, success: true },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("[API FASILITAS POST]", error);
        return NextResponse.json(
            { message: "Terjadi kesalahan server", success: false },
            { status: 500 }
        );
    }
};