import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// GET By ID (Untuk Detail/Edit)
export const GET = async (req: NextRequest, { params }: Params) => {
    try {
        const { id } = await params; 

        const data = await prisma.tb_fasilitas.findUnique({
            where: { id: Number(id) },
        });

        if (!data) {
            return NextResponse.json(
                { message: "Data tidak ditemukan", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { fasilitas: data, success: true }, 
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error Server", success: false },
            { status: 500 }
        );
    }
};

// PUT (Update Data)
export const PUT = async (req: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;
        const data = await req.json();

        // Validasi
        if (!data.namaFasilitas || !data.kodeFasilitas) {
            return NextResponse.json({ message: "Data tidak lengkap", success: false }, { status: 400 });
        }

        const updated = await prisma.tb_fasilitas.update({
            where: { id: Number(id) },
            data: {
                namaFasilitas: data.namaFasilitas,
                kodeFasilitas: data.kodeFasilitas,
                deskripsi: data.deskripsi,
            },
        });

        return NextResponse.json(
            { message: "Data Berhasil Diupdate", data: updated, success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Gagal update data", success: false },
            { status: 500 }
        );
    }
};

// DELETE (Hapus Data)
export const DELETE = async (req: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;

        await prisma.tb_fasilitas.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json(
            { message: "Data berhasil dihapus", success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Gagal menghapus data (Mungkin sedang digunakan)", success: false },
            { status: 500 }
        );
    }
};