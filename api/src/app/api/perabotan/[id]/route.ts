import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// GET By ID
export const GET = async (req: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;
        const perabotanId = Number(id);

        if (isNaN(perabotanId)) {
            return NextResponse.json(
                {
                    message: "ID Tidak Valid",
                    success: false
                },
                {
                    status: 400
                }
            );
        }

        const data = await prisma.tb_perabotan.findUnique({
            where: {
                id: perabotanId
            },
        });

        if (!data) {
            return NextResponse.json(
                {
                    message: "Data tidak ditemukan",
                    success: false
                },
                {
                    status: 404
                }
            );
        }

        return NextResponse.json(
            {
                data: data,
                success: true
            },
            {
                status: 200
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: "Server Error",
                success: false
            },
            {
                status: 500
            }
        );
    }
};

// PUT (Update)
export const PUT = async (req: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;
        const perabotanId = Number(id);
        const dataInput = await req.json();

        if (isNaN(perabotanId)) {
            return NextResponse.json(
                {
                    message: "ID Tidak Valid",
                    success: false
                },
                {
                    status: 400
                }
            );
        }

        if (!dataInput.namaPerabotan || !dataInput.kodePerabotan) {
            return NextResponse.json(
                {
                    message: "Data tidak lengkap",
                    success: false
                },
                {
                    status: 400
                }
            );
        }

        const existing = await prisma.tb_perabotan.findUnique(
            {
                where: {
                    id: perabotanId
                }
            }
        );
        if (!existing) {
            return NextResponse.json(
                {
                    message: "Data tidak ditemukan",
                    success: false
                },
                {
                    status: 404
                }
            );
        }

        // Update
        const updated = await prisma.tb_perabotan.update({
            where: {
                id: perabotanId
            },
            data: {
                namaPerabotan: dataInput.namaPerabotan,
                kodePerabotan: dataInput.kodePerabotan,
                deskripsi: dataInput.deskripsi,
            },
        });

        return NextResponse.json(
            {
                message: "Data Berhasil Diubah",
                data: updated,
                success: true
            },
            {
                status: 200
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Gagal update data",
                success: false
            },
            { status: 500 }
        );
    }
};

// DELETE
export const DELETE = async (req: NextRequest, { params }: Params) => {
    try {
        const { id } = await params;
        const perabotanId = Number(id);

        if (isNaN(perabotanId)) {
            return NextResponse.json(
                {
                    message: "ID Tidak Valid",
                    success: false
                },
                {
                    status: 400
                }
            );
        }

        const existing = await prisma.tb_perabotan.findUnique(
            {
                where: {
                    id: perabotanId
                }
            }
        );
        if (!existing) {
            return NextResponse.json(
                {
                    message: "Data tidak ditemukan",
                    success: false
                },
                {
                    status: 404
                }
            );
        }

        await prisma.tb_perabotan.delete(
            {
                where: { id: perabotanId },
            }
        );

        return NextResponse.json(
            {
                message: "Data Berhasil Dihapus",
                success: true
            },
            {
                status: 200
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Gagal menghapus (Mungkin sedang digunakan)",
                success: false
            },
            {
                status: 500
            }
        );
    }
};