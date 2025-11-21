"use client";

import AddDataForm from "@/components/add-data-form";

export default function TambahPerabotanPage() {
  const fields = [
    {
      name: "namaPerabotan",
      label: "Nama Perabotan",
      type: "text" as const,
      required: true,
      placeholder: "Contoh: Kasur",
    },
    {
      name: "kodePerabotan",
      label: "Kode Perabotan",
      type: "text" as const,
      required: true,
      placeholder: "Contoh: PRB001",
    },
    {
      name: "deskripsi",
      label: "Deskripsi",
      type: "textarea" as const,
      required: true,
      placeholder: "Deskripsi perabotan...",
    },
  ];

  return (
    <AddDataForm
      dataType="perabotan"
      redirectPath="/dashboard/user"
      title="Tambah Data Perabotan"
      fields={fields}
    />
  );
}