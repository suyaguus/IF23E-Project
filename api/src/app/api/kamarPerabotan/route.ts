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

        return NextResponse.json(
            {
                success: true,
                data: data
            },
            {
                status: 200
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "SERVER ERROR",
                error: String(error)
            },
            {
                status: 500
            }
        );
    }
};

// POST - Tambah relasi kamar-perabotan
export const POST = async (req: NextRequest) => {
    try {
        const { kamarId, perabotanId, jumlah } = await req.json();

        if (!kamarId || !perabotanId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "KamarId dan PerabotanId Harus Diisi"
                },
                {
                    status: 400
                }
            );
        }

        // Cek apakah kamar exists
        const kamar = await prisma.tb_kamar.findUnique({
            where: { id: Number(kamarId) }
        });

        if (!kamar) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Kamar Tidak Ditemukan"
                },
                {
                    status: 404
                }
            );
        }

        // Cek apakah perabotan exists
        const perabotan = await prisma.tb_perabotan.findUnique({
            where: { id: Number(perabotanId) }
        });

        if (!perabotan) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Perabotan Tidak Ditemukan"
                },
                {
                    status: 404
                }
            );
        }

        // Cek apakah relasi sudah ada
        const exists = await prisma.tb_kamar_perabotan.findUnique({
            where: {
                kamarId_perabotanId: {
                    kamarId: Number(kamarId),
                    perabotanId: Number(perabotanId)
                }
            }
        });

        if (exists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Perabotan Sudah Ada Di Kamar Ini"
                },
                {
                    status: 400
                }
            );
        }

        // Buat relasi baru
        await prisma.tb_kamar_perabotan.create({
            data: {
                kamarId: Number(kamarId),
                perabotanId: Number(perabotanId),
                jumlah: jumlah ? Number(jumlah) : 1
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Perabotan Berhasil Ditambahkan Ke Kamar"
            },
            {
                status: 201
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "SERVER ERROR",
                error: String(error)
            },
            {
                status: 500
            }
        );
    }
};
