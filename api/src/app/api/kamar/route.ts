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

        // --- LOG DEBUGGING (Cek Terminal VS Code Anda saat submit) ---
        console.log("====================================");
        console.log("[API] Data Masuk:", data);

        // 1. Validasi Input Dasar
        if (!data.nomorKamar || !data.hargaSewa) {
            console.log("[API] Gagal: Data tidak lengkap");
            return NextResponse.json(
                { message: "Nomor Kamar dan Harga wajib diisi", success: false },
                { status: 400 }
            );
        }

        // 2. Konversi Harga ke Number
        const hargaFix = Number(data.hargaSewa);
        if (isNaN(hargaFix)) {
            console.log("API] Gagal: Harga bukan angka valid");
            return NextResponse.json(
                { message: "Harga harus berupa angka", success: false },
                { status: 400 }
            );
        }

        // 3. Cek Duplikat Nomor Kamar
        const check = await prisma.tb_kamar.findFirst({
            where: { nomorKamar: data.nomorKamar },
            select: { id: true },
        });

        if (check) {
            console.log("[API] Gagal: Duplikat Nomor Kamar");
            return NextResponse.json(
                { message: "Nomor Kamar sudah digunakan!", success: false },
                { status: 400 }
            );
        }

        // 4. Simpan ke Database
        console.log("[API] Sedang menyimpan ke Prisma...");

        const kamarBaru = await prisma.tb_kamar.create({
            data: {
                nomorKamar: data.nomorKamar,
                hargaSewa: hargaFix,
                statusKamar: data.statusKamar || "Tersedia",
                deskripsi: data.deskripsi,
            },
        });

        console.log("[API] Berhasil Disimpan:", kamarBaru);
        console.log("====================================");

        return NextResponse.json(
            {
                message: "Data Kamar Berhasil Disimpan!",
                data: kamarBaru,
                success: true,
            },
            { status: 201 }
        );

    } catch (error: unknown) {
        // 5. Tangkap Error Server
        console.error("[API CRASH] Error Detail:", error); // <-- Cek pesan ini di Terminal VS Code

        const errorMessage = error instanceof Error ? error.message : String(error);

        return NextResponse.json(
            {
                message: "Terjadi kesalahan pada server",
                success: false,
                error: errorMessage,
            },
            { status: 500 }
        );
    }
};