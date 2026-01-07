// types/interfaces.ts

// --- KAMAR ---
export type StatusKamar = "Tersedia" | "Penuh" | "Perbaikan" | "Kotor";

export interface Kamar {
    id: number;
    nomorKamar: string;
    hargaSewa: number;
    statusKamar: StatusKamar;
    deskripsi?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface KamarInput {
    nomorKamar: string;
    hargaSewa: number;
    statusKamar: StatusKamar;
    deskripsi: string;
}

// --- FASILITAS ---
export interface Fasilitas {
    id: number;
    namaFasilitas: string;
    // Tambahkan field lain jika ada di database (misal: icon, deskripsi)
    createdAt?: string;
    updatedAt?: string;
}

export interface FasilitasInput {
    namaFasilitas: string;
}

// --- PERABOTAN ---
export type KondisiPerabotan = "Baik" | "Rusak" | "Sedang";

export interface Perabotan {
    id: number;
    namaPerabotan: string;
    jumlah: number;
    kondisi: KondisiPerabotan;
    createdAt?: string;
    updatedAt?: string;
}

export interface PerabotanInput {
    namaPerabotan: string;
    jumlah: number;
    kondisi: KondisiPerabotan;
}

// --- USER (Opsional, agar sekalian terpusat) ---
export interface UserData {
    id: number;
    username: string;
    email: string;
    role: string;
    notelp?: string;
}