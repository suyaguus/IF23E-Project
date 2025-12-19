import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sanitizeUser } from '@/lib/sanitize';

const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
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

        // Validasi input
        if (!username || !email || !password || !notelp) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Semua field wajib diisi'
                },
                { status: 400, headers: corsHeaders }
            );
        }

        // Validasi format email
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

        // Validasi panjang password
        if (password.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Password minimal 6 karakter'
                },
                { status: 400, headers: corsHeaders }
            );
        }

        // Cek apakah email sudah terdaftar
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

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user baru
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
        
        // 3. GUNAKAN sanitizeUser SEBELUM KIRIM RESPONSE
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