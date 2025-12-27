import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { StatusKamar } from "@prisma/client";


// fungsi untuk menghapus data
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {

    try {
        const { id } = await context.params;
        const kamarId = Number(id);

        // validasi id
        if (isNaN(kamarId)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "ID Tidak Valid"
                },
                {
                    status: 400
                }
            );
        }

        // Cek apakah kamar exists dan ambil relasi
        const kamar = await prisma.tb_kamar.findUnique({
            where: { id: kamarId },
            include: {
                orders: true,
                riwayatPembayaran: true,
                fasilitas: true,
                perabotan: true
            }
        });

        // jika kamar tidak ditemukan
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

        // jika kamar memiliki relasi order maka tidak bisa dihapus
        if (kamar.orders.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Kamar Tidak Dapat Dihapus Karena Memiliki ${kamar.orders.length} Order Aktif`
                },
                {
                    status: 400
                }
            );
        }

        // jika kamar memiliki relasi riwayat pembayaran maka tidak bisa dihapus
        if (kamar.riwayatPembayaran.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Kamar Tidak Dapat Dihapus Karena Memiliki Riwayat Pembayaran"
                },
                {
                    status: 400
                }
            );
        }

        // hapus kamar beserta relasinya dalam transaksi
        await prisma.$transaction(async (tx) => {

            // hapus relasi many-to-many terlebih dahulu
            await tx.tb_kamar_fasilitas.deleteMany({
                where: { kamarId: kamarId }
            });

            await tx.tb_kamar_perabotan.deleteMany({
                where: { kamarId: kamarId }
            });

            // sekarang hapus kamar
            await tx.tb_kamar.delete({
                where: { id: kamarId }
            });
        });

        // response sukses
        return NextResponse.json(
            {
                success: true,
                message: "Kamar Berhasil Di Hapus"
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.error("Error saat menghapus kamar:", error);

        // response error
        return NextResponse.json(
            {
                success: false,
                message: "Terjadi Kesalahan Saat Menghapus Kamar",
                error: error instanceof Error ? error.message : String(error)
            },
            {
                status: 500
            }
        );
    }
};

// buat fungsi update data
export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);
    const data = await request.json();

    console.log(`[API UPDATE] ID: ${id}`, data);

    // Validasi
    if (!data.nomorKamar || !data.hargaSewa) {
      return NextResponse.json(
        { message: "Nomor Kamar dan Harga wajib diisi", success: false },
        { status: 400 }
      );
    }

    const checkDuplicate = await prisma.tb_kamar.findFirst({
      where: {
        nomorKamar: data.nomorKamar,
        NOT: {
          id: id, 
        },
      },
    });

    if (checkDuplicate) {
      return NextResponse.json(
        { message: "Nomor Kamar sudah digunakan oleh kamar lain!", success: false },
        { status: 400 }
      );
    }

    let statusKamarFix: StatusKamar = StatusKamar.Tersedia; 
    if (data.statusKamar) {
      const rawStatus = String(data.statusKamar)
        .toUpperCase()
        .replace(/\s/g, "_") 
        .replace(/[^A-Z_]/g, ""); 

      // Mapping Manual untuk keamanan
      if (rawStatus.includes("TERSEWA")) {
        statusKamarFix = StatusKamar.Tersewa;
      } else if (rawStatus.includes("TIDAK") || rawStatus.includes("NOT")) {
        statusKamarFix = StatusKamar.TidakTersedia;
      } else {
        statusKamarFix = StatusKamar.Tersedia;
      }
    }
    // -------------------------------------------------

    // Update Database
    const updatedKamar = await prisma.tb_kamar.update({
      where: { id: id },
      data: {
        nomorKamar: data.nomorKamar,
        hargaSewa: Number(data.hargaSewa),
        statusKamar: statusKamarFix,
        deskripsi: data.deskripsi,
      },
    });

    return NextResponse.json(
      {
        message: "Data Kamar Berhasil Diupdate!",
        data: updatedKamar,
        success: true,
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error("🔥 [API EDIT ERROR]:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: "Gagal mengupdate data", success: false, error: errorMessage },
      { status: 500 }
    );
  }
};

// buat fungsi get data berdasarkan id
export const GET = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const kamarId = Number(id);

    // validasi id
    if (isNaN(kamarId)) {
        return NextResponse.json(
            {
                success: false,
                message: "ID Tidak Valid"
            },
            {
                status: 400
            }
        );
    }

    // ambil data kamar berdasarkan id
    const kamar = await prisma.tb_kamar.findUnique({
        where: { id: kamarId },
        select: {
            nomorKamar: true,
            hargaSewa: true,
            statusKamar: true,
            deskripsi: true
        }
    });

    // jika kamar tidak ditemukan
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

    // response sukses
    return NextResponse.json({
        success: true,
        message: "Kamar Berhasil Ditemukan",
        data: kamar
    },
        {
            status: 200
        }
    );
};  