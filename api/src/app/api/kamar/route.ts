import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { StatusKamar } from "@prisma/client";

// buat service ambil data
export const GET = async () => {
    try {
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
    } catch (error) {
        return NextResponse.json(
            { message: "Gagal mengambil data kamar", success: false },
            { status: 500 }
        );
    }
}

// buat service simpan data
export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();

        console.log("[API] Data Masuk:", data);

        if (!data.nomorKamar || !data.hargaSewa) {
            return NextResponse.json(
                { message: "Nomor Kamar dan Harga wajib diisi", success: false },
                { status: 400 }
            );
        }

        const hargaFix = Number(data.hargaSewa);
        if (isNaN(hargaFix)) {
            return NextResponse.json(
                { message: "Harga harus berupa angka", success: false },
                { status: 400 }
            );
        }

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

        let statusKamarFix: StatusKamar = StatusKamar.Tersedia;

        if (data.statusKamar) {
            const rawStatus = String(data.statusKamar).replace(/\s/g, "").toUpperCase();

            if (rawStatus === "TERSEWA") {
                statusKamarFix = StatusKamar.Tersewa;
            }
            else if (rawStatus === "TIDAK_TERSEDIA" ||
                rawStatus === "TIDAKTERSEDIA" ||
                rawStatus === "TIDAK TERSEDIA") {
                statusKamarFix = StatusKamar.TidakTersedia;
            }
            else {
                statusKamarFix = StatusKamar.Tersedia;
            }
        }

        const kamarBaru = await prisma.tb_kamar.create({
            data: {
                nomorKamar: data.nomorKamar,
                hargaSewa: hargaFix,
                statusKamar: statusKamarFix,
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