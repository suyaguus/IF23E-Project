import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async() => {
    const data = await prisma.tb_user.findMany({
        orderBy: {
            id: 'asc'
        }
    });

    return NextResponse.json({
        user: data
    })
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
        return NextResponse.json({
            message: "Data Gagal Disimpan ! (Email Sudah Digunakan)",
            success: false
        })
    }

    // jika email tidak ditemukan
    await prisma.tb_user.create({
        data: {
            username: data.username,
            email: data.email,
            role: data.role || "User",
            password: data.password
        }
    })

    // tampilkan respon
    return NextResponse.json({
        message: "Data berhasil disimpan",
        success: true
    })
}