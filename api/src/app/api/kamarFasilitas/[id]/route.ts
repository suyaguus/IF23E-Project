import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service delete
export const DELETE = async (req: NextRequest) => {
    try {

        // ambil id dari tabel kamar dan fasilitas
        const { kamarId, fasilitasId } = await req.json();

        // cek apakah kamar exists
        await prisma.tb_kamar_fasilitas.delete({
            where: {
                kamarId_fasilitasId: {
                    kamarId: Number(kamarId),
                    fasilitasId: Number(fasilitasId)
                }
            }
        });

        // response sukses
        return NextResponse.json(
            {
                success: true,
                message: "Fasilitas Berhasil Dihapus Dari Kamar"
            },
            {
                status: 200
            }
        );
    } catch {
        // response error
        return NextResponse.json(
            {
                success: false,
                message: "SERVER ERROR"
            },
            {
                status: 500
            }
        );
    }
}