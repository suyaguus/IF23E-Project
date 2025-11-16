import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat service tampil data
export const GET = async() => {
    const data = await prisma.tb_fasilitas.findMany({
        orderBy: {
            id: 'asc'
        }
    })

    return NextResponse.json({
        fasilitas: data
    })
};