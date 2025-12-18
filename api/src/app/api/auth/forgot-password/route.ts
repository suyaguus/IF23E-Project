import { sendEmail } from "@/lib/mail"; // Pastikan nama export sesuai dengan file mail.ts Anda
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. Cek apakah user terdaftar di tb_user
    // (Gunakan tb_user sesuai schema Anda sebelumnya, bukan prisma.user)
    const user = await prisma.tb_user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({
        message: "Email tidak ditemukan",
        code: 400 
      });
    }

    // 2. HAPUS OTP LAMA (PENTING)
    // Sebelum buat baru, hapus OTP lama milik email ini agar database bersih
    // dan user tidak bingung dengan kode lama.
    await prisma.tb_otp.deleteMany({
      where: { email }
    });

    // 3. Generate Kode 6 Digit (lebih aman daripada 4 digit)
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 4. Simpan ke tabel tb_otp
    await prisma.tb_otp.create({
      data: {
        email: email,
        otp: code,
        // Set expired 5 menit dari sekarang (5 * 60 * 1000)
        expiresAt: new Date(Date.now() + 5 * 60 * 1000) 
      }
    });

    // 5. Kirim Email
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