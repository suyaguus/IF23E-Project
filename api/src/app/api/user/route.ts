import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// buat service tampil data
export const GET = async () => {
    const data = await prisma.tb_user.findMany({
        orderBy: {
            id: 'asc'
        },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            notelp: true,
            imageUrl: true,
            createdAt: true,
        },
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
  const data = await request.json();

  if (!data.email || !data.password || !data.username) {
    return NextResponse.json(
      { success: false, message: "Data wajib diisi" },
      { status: 400 }
    );
  }

  const check = await prisma.tb_user.findUnique({
    where: { email: data.email },
  });

  if (check) {
    return NextResponse.json(
      { success: false, message: "Email sudah digunakan" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.tb_user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role ?? "User",
      notelp: data.notelp,
    },
  });

  return NextResponse.json(
    { success: true, message: "User berhasil dibuat", data: user.id },
    { status: 201 }
  );
};

