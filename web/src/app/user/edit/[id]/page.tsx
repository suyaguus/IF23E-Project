"use client";

import EditDataPage from "@/components/edit-data-page";

export default function EditUserPage() {
  return (
    <EditDataPage
      dataType="user"
      redirectPath="/user"
      title="Edit Data User"
    />
  );
}