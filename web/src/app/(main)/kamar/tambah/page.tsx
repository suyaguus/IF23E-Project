"use client";

import AddDataForm from "@/components/add-data-form";

export default function TambahKamarPage() {
  const fields = [
    {
      name: "nomorKamar",
      label: "Nomor Kamar",
      type: "text" as const,
      required: true,
      placeholder: "Contoh: 101",
    },
    {
      name: "hargaSewa",
      label: "Harga Sewa (Rp)",
      type: "number" as const,
      required: true,
      placeholder: "500000",
    },
    {
      name: "statusKamar",
      label: "Status Kamar",
      type: "select" as const,
      required: true,
      options: [
        { value: "Tersedia", label: "Tersedia" },
        { value: "Tersewa", label: "Tersewa" },
        { value: "TidakTersedia", label: "Tidak Tersedia" },
      ],
      defaultValue: "Tersedia",
    },
    {
      name: "deskripsi",
      label: "Deskripsi",
      type: "textarea" as const,
      required: true,
      placeholder: "Deskripsi kamar...",
    },
  ];

  return (
    <AddDataForm
      dataType="kamar"
      redirectPath="/kamar"
      title="Tambah Data Kamar"
      fields={fields}
    />
  );
}
