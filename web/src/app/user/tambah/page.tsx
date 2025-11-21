"use client";

import AddDataForm from "@/components/add-data-form";

export default function TambahUserPage() {
  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text" as const,
      required: true,
      placeholder: "Masukkan username",
    },
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      required: true,
      placeholder: "user@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password" as const,
      required: true,
      placeholder: "Minimal 6 karakter",
    },
    {
      name: "role",
      label: "Role",
      type: "select" as const,
      required: true,
      options: [
        { value: "Admin", label: "Admin" },
        { value: "User", label: "User" },
      ],
      defaultValue: "User",
    },
  ];

  return (
    <AddDataForm
      dataType="user"
      redirectPath="/dashboard/user"
      title="Tambah Data User"
      fields={fields}
    />
  );
}