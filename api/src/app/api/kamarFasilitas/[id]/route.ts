import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// service delete
export const DELETE = async (req: NextRequest) => {
    try {
        const { kamarId, fasilitasId } = await req.json();

        await prisma.tb_kamar_fasilitas.delete({
            where: {
                kamarId_fasilitasId: {
                    kamarId: Number(kamarId),
                    fasilitasId: Number(fasilitasId)
                }
            }
        });

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