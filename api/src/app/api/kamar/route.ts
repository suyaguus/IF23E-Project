import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { StatusKamar } from "@prisma/client";

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

        console.log("[API] Data Masuk:", data);

        // Validasi Input Dasar
        if (!data.nomorKamar || !data.hargaSewa) {
            return NextResponse.json(
                { message: "Nomor Kamar dan Harga wajib diisi", success: false },
                { status: 400 }
            );
        }

        // Konversi Harga
        const hargaFix = Number(data.hargaSewa);
        if (isNaN(hargaFix)) {
            return NextResponse.json(
                { message: "Harga harus berupa angka", success: false },
                { status: 400 }
            );
        }

        // Cek Duplikat
        const check = await prisma.tb_kamar.findFirst({
            where: { nomorKamar: data.nomorKamar },
            select: { id: true },
        });

        if (check) {
            return NextResponse.json(
                { message: "Nomor Kamar sudah digunakan!", success: false },
                { status: 400 }
            );
        }

        // --- PERBAIKAN LOGIC MAPPING STATUS ---
        // Inisialisasi variabel dengan Tipe Enum, bukan string biasa
        let statusKamarFix: StatusKamar = StatusKamar.Tersedia;

        if (data.statusKamar) {
            const rawStatus = String(data.statusKamar).toUpperCase();

            if (rawStatus === "TERSEWA") {
                statusKamarFix = StatusKamar.Tersewa; // Gunakan Enum
            } else if (rawStatus === "TIDAKTERSEDIA" || rawStatus === "TIDAK TERSEDIA") {
                statusKamarFix = StatusKamar.TidakTersedia; // Gunakan Enum
            } else {
                // Default ke Tersedia jika input tidak dikenali
                statusKamarFix = StatusKamar.Tersedia; // Gunakan Enum
            }
        }
        // --------------------------------------

        // Simpan ke Database
        const kamarBaru = await prisma.tb_kamar.create({
            data: {
                nomorKamar: data.nomorKamar,
                hargaSewa: hargaFix,
                statusKamar: statusKamarFix, // Sekarang tipe datanya sudah cocok (StatusKamar)
                deskripsi: data.deskripsi,
            },
        });

        console.log("[API] Berhasil Disimpan:", kamarBaru);

        return NextResponse.json(
            {
                message: "Data Kamar Berhasil Disimpan!",
                data: kamarBaru,
                success: true,
            },
            { status: 201 }
        );

    } catch (error: unknown) {
        console.error("[API CRASH] Error Detail:", error);

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