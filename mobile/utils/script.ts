// buat fungsi format rupiah untuk view harga
export const formatRupiah = (value: number) => {
    return value.toLocaleString("id-ID");
};