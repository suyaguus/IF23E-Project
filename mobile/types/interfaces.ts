// bagian kamar
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

// bagian fasilitas
export interface Fasilitas {
    id: number;
    namaFasilitas: string;
    kodeFasilitas: string;
    deskripsi?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface FasilitasInput {
    namaFasilitas: string;
    kodeFasilitas: string;
    deskripsi?: string;
}

// bagian perabotan
export type KondisiPerabotan = "Baik" | "Rusak" | "Sedang";

export interface Perabotan {
    id: number;
    namaPerabotan: string;
    kodePerabotan: string;
    deskripsi?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PerabotanInput {
    namaPerabotan: string;
    kodePerabotan: string;
    deskripsi?: string;
}

// bagian user
export interface UserData {
    id: number;
    username: string;
    email: string;
    role: string;
    notelp?: string;
}