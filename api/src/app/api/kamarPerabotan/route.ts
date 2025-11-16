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

// POST - Tambah relasi kamar-perabotan
export const POST = async (req: NextRequest) => {
    try {
        const { kamarId, perabotanId, jumlah } = await req.json();

        if (!kamarId || !perabotanId) {
            return NextResponse.json({
                success: false,
                message: "kamarId dan perabotanId harus diisi"
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

        // Cek apakah perabotan exists
        const perabotan = await prisma.tb_perabotan.findUnique({
            where: { id: Number(perabotanId) }
        });

        if (!perabotan) {
            return NextResponse.json({
                success: false,
                message: "Perabotan tidak ditemukan"
            });
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
            return NextResponse.json({
                success: false,
                message: "Perabotan sudah ditambahkan ke kamar ini"
            });
        }

        // Buat relasi baru
        await prisma.tb_kamar_perabotan.create({
            data: {
                kamarId: Number(kamarId),
                perabotanId: Number(perabotanId),
                jumlah: jumlah ? Number(jumlah) : 1
            }
        });

        return NextResponse.json({
            success: true,
            message: "Perabotan berhasil ditambahkan ke kamar"
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error",
            error: String(error)
        });
    }
};

// DELETE - Hapus relasi kamar-perabotan
export const DELETE = async (req: NextRequest) => {
    try {
        // Ambil dari query params atau body
        const { searchParams } = new URL(req.url);
        const kamarIdQuery = searchParams.get('kamarId');
        const perabotanIdQuery = searchParams.get('perabotanId');

        let kamarId = kamarIdQuery;
        let perabotanId = perabotanIdQuery;

        // Jika tidak ada di query, coba dari body
        if (!kamarId || !perabotanId) {
            const body = await req.json().catch(() => ({}));
            kamarId = body.kamarId || kamarId;
            perabotanId = body.perabotanId || perabotanId;
        }

        if (!kamarId || !perabotanId) {
            return NextResponse.json({
                success: false,
                message: "kamarId dan perabotanId harus diisi"
            });
        }

        await prisma.tb_kamar_perabotan.delete({
            where: {
                kamarId_perabotanId: {
                    kamarId: Number(kamarId),
                    perabotanId: Number(perabotanId)
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Perabotan berhasil dihapus dari kamar"
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Server error",
            error: String(error)
        });
    }
};