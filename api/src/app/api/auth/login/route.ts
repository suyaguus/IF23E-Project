import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

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
        console.log('Login request received');

        const body = await request.json();
        const { email, password } = body;

        console.log('Login attempt:', { email });

        // validasi input
        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email dan password wajib diisi'
                },
                { status: 400, headers: corsHeaders }
            );
        }

        // cari data user berdasarkan email
        const user = await prisma.tb_user.findUnique({
            where: { email },
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
                role: true,
                notelp: true,
                createdAt: true
            }
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email atau password salah'
                },
                { status: 401, headers: corsHeaders }
            );
        }

        // bandingkan password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email atau password salah'
                },
                { status: 401, headers: corsHeaders }
            );
        }

        // kirim response dengan data user (tanpa password)
        const { password: _password, ...userWithoutPassword } = user;

        console.log('Login successful:', userWithoutPassword.email);

        return NextResponse.json(
            {
                success: true,
                message: 'Login berhasil',
                data: {
                    user: userWithoutPassword
                }
            },
            { status: 200, headers: corsHeaders }
        );

    } catch (error) {
        console.error('Error during login:', error);
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