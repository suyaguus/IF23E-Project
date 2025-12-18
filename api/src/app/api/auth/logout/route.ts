import { NextRequest, NextResponse } from 'next/server';

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
        const body = await request.json().catch(() => ({}));
        const { userId, email } = body;

        if (userId) {
            console.log("User logout:", { userId, email });
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Logout berhasil'
            },
            { status: 200, headers: corsHeaders }
        );

    } catch (error) {
        console.error('Error during logout:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return NextResponse.json(
            {
                success: false,
                message: 'Internal Server Error',
                error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
            },
            { status: 500, headers: corsHeaders }
        );
    }
}