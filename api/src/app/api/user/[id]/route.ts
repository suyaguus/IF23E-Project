import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { Prisma } from "@prisma/client";


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// buat service delete
export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const userId = Number(id);

    // validasi id
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

    // cek apakah user ada
    const user = await prisma.tb_user.findUnique({
        where: { id: userId },
    });

    // jika user tidak ditemukan
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

    // hapus data
    await prisma.tb_order.deleteMany({
        where: { userId: userId },
    });

    await prisma.tb_user.delete({
        where: { id: userId },
    });

    // tampilkan response
    return NextResponse.json(
        {
            success: true,
            message: "Data User Berhasil Di Hapus",
        },
        {
            status: 200
        }
    );
};

export const dynamic = "force-dynamic";

// get user berdasarkan id
export const GET = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await context.params;
        const userId = Number(id);

        // validasi id
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

        // cek apakah user ada
        const user = await prisma.tb_user.findUnique({
            where: { id: userId },
            select: {
                username: true,
                email: true,
                password: true,
                role: true,
                notelp: true
            }
        });

        // jika user tidak ditemukan
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

        // tampilkan response
        return NextResponse.json(
            {
                success: true, message: "Data Berhasil Ditemukan", user
            },
            {
                status: 200
            }
        );

    } catch (error) {
        // tampilkan error
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

// Update User berdasarkan ID (bukan Email)
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> } // Tambahkan context params
) {
    try {
        // 1. Ambil ID dari URL
        const { id } = await context.params;
        const userId = Number(id);

        // 2. Validasi ID
        if (isNaN(userId)) {
            return NextResponse.json(
                { success: false, message: "ID tidak valid" },
                { status: 400, headers: corsHeaders }
            );
        }

        // 3. Ambil data dari Body
        const body = await req.json();
        const { username, notelp } = body;
        // Note: Kita tidak butuh email dari body untuk query WHERE, karena sudah ada ID

        // 4. Cek apakah user dengan ID tersebut ada
        const existingUser = await prisma.tb_user.findUnique({
            where: { id: userId }, // Cari berdasarkan ID
        });

        if (!existingUser) {
            return NextResponse.json(
                { success: false, message: "User tidak ditemukan" },
                { status: 404, headers: corsHeaders }
            );
        }

        // 5. Siapkan data update
        const dataToUpdate: Prisma.tb_userUpdateInput = {};

        if (username !== undefined && username !== null && username.trim() !== "") {
            dataToUpdate.username = username;
        }
        if (notelp !== undefined && notelp !== null && notelp.trim() !== "") {
            dataToUpdate.notelp = notelp;
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return NextResponse.json(
                { success: true, message: "Tidak ada data yang diubah.", data: existingUser },
                { status: 200, headers: corsHeaders }
            );
        }

        // 6. Lakukan Update
        const updatedUser = await prisma.tb_user.update({
            where: { id: userId }, // Update berdasarkan ID
            data: dataToUpdate,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Profil berhasil diperbarui",
                data: updatedUser,
            },
            { status: 200, headers: corsHeaders }
        );

    } catch (error) {
        console.error("[API Error] PUT /api/user/[id]:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const userId = Number(id);

        if (isNaN(userId)) {
            return NextResponse.json(
                { success: false, message: "ID tidak valid" },
                { status: 400, headers: corsHeaders }
            );
        }

        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "Image wajib diupload" },
                { status: 400, headers: corsHeaders }
            );
        }

        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { success: false, message: "File harus berupa image" },
                { status: 400, headers: corsHeaders }
            );
        }

        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json(
                { success: false, message: "Ukuran maksimal 2MB" },
                { status: 400, headers: corsHeaders }
            );
        }

        const user = await prisma.tb_user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User tidak ditemukan" },
                { status: 404, headers: corsHeaders }
            );
        }

        if (user.imageId) {
            await cloudinary.uploader.destroy(user.imageId);
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult = await new Promise<UploadApiResponse>(
            (resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "user/profile" },
                    (error, result) => {
                        if (error || !result) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            }
        );

        const updatedUser = await prisma.tb_user.update({
            where: { id: userId },
            data: {
                imageUrl: uploadResult.secure_url,
                imageId: uploadResult.public_id,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Foto profil berhasil diperbarui",
                data: updatedUser,
            },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        console.error("[PATCH USER IMAGE ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Server Error" },
            { status: 500, headers: corsHeaders }
        );
    }
}
