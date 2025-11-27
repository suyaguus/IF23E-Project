// buat fungsi format rupiah untuk view harga
export const formatRupiah = (value: number) => {
    return value.toLocaleString("id-ID");
};

// buat fungsi untuk format ribuan
export const formatRibuan = (value: string) => {
    const numeric = value.replace(/[^0-9]/g, "");
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// buat fungsi regex untuk filter harga
export const filterHarga = (value: string) => {
    return value.replace(/[^0-9]/g, "");
};

// buat fungsi regex untuk filter harga tanpa titik
export const filterHargaRaw = (value: string) => {
    return value.replace(/\./g, "");
};

// buat fungsi regex untuk filter nomor kamar 
export const filterNomorKamar = (value: string) => {
    return value.replace(/[^A-Za-z0-9]/g, "");
};