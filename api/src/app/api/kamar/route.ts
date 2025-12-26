import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service ambil data
export const GET = async () => {
    const data = await prisma.tb_kamar.findMany({
        orderBy: {
            id: "asc",
        },
    });

    return NextResponse.json(
        {
            kamar: data,
        },
        {
            status: 200,
        }
    );
}

// buat service simpan data
export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();

        if (!data.nomorKamar || !data.hargaSewa) {
            return NextResponse.json(
                { message: "Nomor Kamar dan Harga Sewa wajib diisi", success: false },
                { status: 400 }
            );
        }

        const check = await prisma.tb_kamar.findFirst({
            where: {
                nomorKamar: data.nomorKamar,
            },
            select: {
                id: true, 
            },
        });

        // Jika ditemukan duplikat
        if (check) {
            return NextResponse.json(
                {
                    message: "Gagal: Nomor Kamar sudah digunakan!",
                    success: false,
                },
                {
                    status: 400,
                }
            );
        }

        await prisma.tb_kamar.create({
            data: {
                nomorKamar: data.nomorKamar,
                hargaSewa: Number(data.hargaSewa), 
                statusKamar: data.statusKamar, 
                deskripsi: data.deskripsi,
            },
        });

        // 5. Return Success
        return NextResponse.json(
            {
                message: "Data Kamar Berhasil Disimpan!",
                success: true,
            },
            {
                status: 201,
            }
        );
    } catch (error: unknown) {
        // 6. Error Handling
        console.error("API Error (POST /kamar):", error);

        return NextResponse.json(
            {
                message: "Terjadi kesalahan pada server",
                success: false,
                error: error instanceof Error ? error.message : String(error),
            },
            {
                status: 500,
            }
        );
    }
};