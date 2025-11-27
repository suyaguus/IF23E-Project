import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";  // Sesuaikan dengan path Prisma Anda

export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const userId = Number(id);

    if (isNaN(userId)) {
        return NextResponse.json(
            {
                success: false, message: "ID tidak Valid"
            },
            {
                status: 400
            }

        );
    }

    const user = await prisma.tb_user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        return NextResponse.json(
            {
                success: false, message: "User Tidak Ditemukan"
            },
            {
                status: 404
            }
        );
    }

    // Step 1: Delete related orders or any other records referencing the user
    await prisma.tb_order.deleteMany({
        where: { userId: userId }, // Assuming userId is the foreign key in tb_order
    });

    // Step 2: Delete the user
    await prisma.tb_user.delete({
        where: { id: userId },
    });

    return NextResponse.json(
        {
            success: true,
            message: "Data User Berhasil Di Hapus",
        },
        {
            status: 200
        }
    );

    // testing
};


// get user berdasarkan id
export const GET = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await context.params;
        const userId = Number(id);

        if (isNaN(userId)) {
            return NextResponse.json(
                {
                    success: false, message: "ID tidak Valid"
                },
                {
                    status: 400
                }
            );
        }

        const user = await prisma.tb_user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                email: true,
                password: true,
                role: true
            }
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false, message: "User Tidak DItemukan"
                },
                {
                    status: 404
                }
            );
        }

        return NextResponse.json(
            {
                success: true, message: "Data Berhasil Ditemukan", user
            },
            {
                status: 200
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                success: false, message: "SERVER ERROR", error: String(error)
            },
            {
                status: 500
            }
        );
    }
}

// buat putt data
export const PUT = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await context.params;
        const userId = Number(id);
        const data = await req.json();

        if (isNaN(userId)) {
            return NextResponse.json(
                {
                    success: false, message: "ID Tidak Valid"
                },
                {
                    status: 400
                }
            );
        }

        const user = await prisma.tb_user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false, message: "User Tidak Ditemukan"
                },
                {
                    status: 404
                }
            );
        }

        await prisma.tb_user.update({
            where: { id: userId },
            data: data,
        });

        return NextResponse.json(
            {
                success: true, message: "Data Berhasil Diubah"
            },
            {
                status: 200
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                success: false, message: "SERVER ERROR", error: String(error)
            },
            {
                status: 500
            }
        );
    }
}