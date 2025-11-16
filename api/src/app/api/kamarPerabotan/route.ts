import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service get
export const GET = async () => {
    try {
        const data = await prisma.tb_kamar_perabotan.findMany({
            include: {
                kamar: {
                    select: {
                        id: true,
                        nomorKamar: true,
                        statusKamar: true
                    }
                },
                perabotan: {
                    select: {
                        id: true,
                        namaPerabotan: true,
                        kodePerabotan: true,
                        deskripsi: true
                    }
                }
            },
            orderBy: {
                kamarId: 'asc'
            }
        });

        return NextResponse.json({
            success: true,
            data: data
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error",
            error: String(error)
        });
    }
};
