import { sendEmail } from "@/lib/mail";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // validasi email
    const user = await prisma.tb_user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({
        message: "Email tidak ditemukan",
        code: 400
      });
    }

    // menghapus kode otp lama jika ada
    await prisma.tb_otp.deleteMany({
      where: { email }
    });

    // generate kode otp
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // simpan kode otp dan buat batas waktu kadaluarsa 5 menit
    await prisma.tb_otp.create({
      data: {
        email: email,
        otp: code,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
      }
    });

    // kirim email
    await sendEmail(
      email,
      "Kode Reset Password",
      `<div style="font-family: sans-serif;">
         <h2>Permintaan Reset Password</h2>
         <p>Berikut adalah kode OTP Anda:</p>
         <h1 style="letter-spacing: 5px; background: #f4f4f4; padding: 10px; display: inline-block;">${code}</h1>
         <p>Kode ini berlaku selama <strong>5 menit</strong>.</p>
         <p>Jika Anda tidak merasa meminta kode ini, abaikan saja.</p>
       </div>`
    );

    return NextResponse.json({
      message: "Kode reset telah dikirim ke email",
      code: 200
    });

  } catch (error) {
    console.log("FORGOT_PASS_ERROR:", error);
    return NextResponse.json({
      message: "Terjadi kesalahan pada server",
      code: 500
    });
  }
}