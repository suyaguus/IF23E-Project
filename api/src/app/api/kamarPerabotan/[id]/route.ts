import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service delete
export const DELETE = async (req: NextRequest) => {
    try {

        // ambil id dari tabel kamar dan perabotan
        const { kamarId, perabotanId } = await req.json();

        // cek apakah kamar exists
        await prisma.tb_kamar_perabotan.delete({
            where: {
                kamarId_perabotanId: {
                    kamarId: Number(kamarId),
                    perabotanId: Number(perabotanId)
                }
            }
        });

        // response sukses
        return NextResponse.json(
            {
                success: true,
                message: "Perabotan Berhasil Dihapus Dari Kamar"
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
                message: "Perabotan Gagal Dihapus Dari Kamar"
            },
            {
                status: 500
            }
        );
    }
};
