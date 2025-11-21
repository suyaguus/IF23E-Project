"use client";

import AddDataForm from "@/components/add-data-form";

export default function TambahFasilitasPage() {
  const fields = [
    {
      name: "namaFasilitas",
      label: "Nama Fasilitas",
      type: "text" as const,
      required: true,
      placeholder: "Contoh: AC",
    },
    {
      name: "kodeFasilitas",
      label: "Kode Fasilitas",
      type: "text" as const,
      required: true,
      placeholder: "Contoh: FAS001",
    },
    {
      name: "deskripsi",
      label: "Deskripsi",
      type: "textarea" as const,
      required: true,
      placeholder: "Deskripsi fasilitas...",
    },
  ];

  return (
    <AddDataForm
      dataType="fasilitas"
      redirectPath="/dashboard/user"
      title="Tambah Data Fasilitas"
      fields={fields}
    />
  );
}
