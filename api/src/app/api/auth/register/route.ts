import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sanitizeUser } from '@/lib/sanitize';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
    return NextResponse.json({}, {
        status: 200,
        headers: corsHeaders
    });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, email, password, notelp } = body;

        console.log('Register attempt:', { email, username });

        // validasi input
        if (!username || !email || !password || !notelp) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Semua field wajib diisi'
                },
                { status: 400, headers: corsHeaders }
            );
        }

        // validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Format email tidak valid'
                },
                { status: 400, headers: corsHeaders }
            );
        }

        // validasi panjang password
        if (password.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Password minimal 6 karakter'
                },
                { status: 400, headers: corsHeaders }
            );
        }

        // cek apakah email sudah terdaftar
        const existingUser = await prisma.tb_user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email sudah terdaftar'
                },
                { status: 409, headers: corsHeaders }
            );
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // buat user baru
        const newUser = await prisma.tb_user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                notelp,
                role: body.role || 'User',
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                notelp: true,
                createdAt: true
            }
        });

        console.log('User created:', newUser.id);

        // gunakan fungsi sanitizeUser untuk menghapus data sensitif
        const userSafe = sanitizeUser(newUser);

        return NextResponse.json(
            {
                success: true,
                message: 'Pendaftaran berhasil',
                data: {
                    user: userSafe
                }
            },
            { status: 201, headers: corsHeaders }
        );

    } catch (error) {
        console.error('Error during registration:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal Server Error',
                error: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
            },
            { status: 500, headers: corsHeaders }
        );
    }
}