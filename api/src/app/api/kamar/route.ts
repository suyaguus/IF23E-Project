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

        const kamarBaru = await prisma.tb_kamar.create({
            data: {
                nomorKamar: data.nomorKamar,
                // Pastikan hargaSewa menjadi number/int
                hargaSewa: Number(data.hargaSewa),
                // Pastikan statusKamar sesuai dengan Enum di database
                // Jika data.statusKamar kosong, default ke "Tersedia"
                statusKamar: data.statusKamar || "Tersedia",
                deskripsi: data.deskripsi,
            },
        });

        // 5. Return Success
        return NextResponse.json(
            {
                message: "Data Kamar Berhasil Disimpan!",
                data: kamarBaru,
                success: true,
            },
            {
                status: 201, // 201 Created
            }
        );
    } catch (error: unknown) { // 1. Definisikan sebagai unknown
        console.error("API Error (POST /api/kamar):", error);

        // 2. Lakukan pengecekan tipe (Type Narrowing)
        const errorMessage = error instanceof Error ? error.message : String(error);

        return NextResponse.json(
            {
                message: "Terjadi kesalahan pada server (Internal Server Error)",
                success: false,
                // 3. Gunakan variabel errorMessage yang sudah aman
                error: process.env.NODE_ENV === "development" ? errorMessage : undefined,
            },
            {
                status: 500,
            }
        );
    }
};