import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service tampil data
export const GET = async () => {
    const data = await prisma.tb_user.findMany({
        orderBy: {
            id: 'asc'
        }
    });

    // tampilkan respon
    return NextResponse.json(
        {
            user: data
        },
        {
            status: 200
        }
    )
}

// buat service simpan data
export const POST = async (request: NextRequest) => {

    // buat dalam format json
    const data = await request.json();

    // mengecek apakah data email sudah ada
    const check = await prisma.tb_user.findFirst({
        where: {
            email: data.email
        },
        select: {
            email: true
        }
    })

    // jika email sudah ditemukan
    if (check) {
        return NextResponse.json(
            {
                message: "Data Gagal Dibuat ! (Email Sudah Digunakan)",
                success: false
            },
            {
                status: 409
            }

        )
    }

    // jika email tidak ditemukan
    await prisma.tb_user.create({
        data: {
            username: data.username,
            email: data.email,
            role: data.role || "User",
            password: data.password,
            notelp: data.notelp
        }
    })

    // tampilkan respon
    return NextResponse.json(
        {
            message: "Data Berhasil Dibuat",
            success: true
        }, {
        status: 201
    }
    )
}