import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST - Tambah relasi kamar-fasilitas
export const POST = async (req: NextRequest) => {
    try {
        const { kamarId, fasilitasId } = await req.json();

        // Validasi input
        if (!kamarId || !fasilitasId) {
            return NextResponse.json({
                success: false,
                message: "kamarId dan fasilitasId harus diisi"
            });
        }

        // Cek apakah kamar exists
        const kamar = await prisma.tb_kamar.findUnique({
            where: { id: Number(kamarId) }
        });

        if (!kamar) {
            return NextResponse.json({
                success: false,
                message: "Kamar tidak ditemukan"
            });
        }

        // Cek apakah fasilitas exists
        const fasilitas = await prisma.tb_fasilitas.findUnique({
            where: { id: Number(fasilitasId) }
        });

        if (!fasilitas) {
            return NextResponse.json({
                success: false,
                message: "Fasilitas tidak ditemukan"
            });
        }

        // Cek apakah relasi sudah ada
        const exists = await prisma.tb_kamar_fasilitas.findUnique({
            where: {
                kamarId_fasilitasId: {
                    kamarId: Number(kamarId),
                    fasilitasId: Number(fasilitasId)
                }
            }
        });

        if (exists) {
            return NextResponse.json({
                success: false,
                message: "Fasilitas sudah ditambahkan ke kamar ini"
            });
        }

        // Buat relasi baru
        await prisma.tb_kamar_fasilitas.create({
            data: {
                kamarId: Number(kamarId),
                fasilitasId: Number(fasilitasId)
            }
        });

        return NextResponse.json({
            success: true,
            message: "Fasilitas berhasil ditambahkan ke kamar"
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error",
            error: String(error)
        });
    }
};
