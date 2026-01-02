"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface EditDataPageProps {
  dataType: "user" | "kamar" | "fasilitas" | "perabotan";
  redirectPath: string;
  title: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditDataPage({
  dataType,
  redirectPath,
  title,
}: EditDataPageProps) {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch data berdasarkan ID
  const { data, error, isLoading } = useSWR(
    id ? `http://localhost:3001/api/${dataType}/${id}` : null,
    fetcher
  );

  // Set form data saat data berhasil di-fetch
  useEffect(() => {
    if (data) {
      // Support multiple response formats:
      // 1. data[dataType] - format: { user: {...} }
      // 2. data.data - format: { data: {...} }
      // 3. data - format: {...} langsung
      const responseData = data[dataType] || data.data || data;

      if (responseData && typeof responseData === "object") {
        setFormData(responseData);
      }
    }
  }, [data, dataType]);

  // Handle perubahan input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `http://localhost:3001/api/${dataType}/${id}`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message || "Data berhasil diubah");
        router.push(redirectPath);
      } else {
        toast.error(response.data.message || "Gagal mengubah data");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengubah data");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Gagal memuat data</p>
          <Link
            href={redirectPath}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  // Render jika data tidak ditemukan
  if (!data || (!data[dataType] && !data.data)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Data tidak ditemukan</p>
          <Link
            href={redirectPath}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  // Ambil keys dari data untuk generate form fields (kecuali id)
  const formFields = Object.keys(formData).filter((key) => key !== "id");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={redirectPath}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">ID: {id}</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field) => {
              const value = formData[field];
              const stringValue =
                value !== null && value !== undefined ? String(value) : "";
              const fieldLabel = field
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());

              // Tentukan tipe input berdasarkan field name atau value type
              let inputType = "text";
              if (field.toLowerCase().includes("email")) {
                inputType = "email";
              } else if (
                field.toLowerCase().includes("password") ||
                field.toLowerCase().includes("pass")
              ) {
                inputType = "password";
              } else if (
                field.toLowerCase().includes("tanggal") ||
                field.toLowerCase().includes("date")
              ) {
                inputType = "date";
              } else if (typeof value === "number") {
                inputType = "number";
              }

              return (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {fieldLabel}
                  </label>
                  {field.toLowerCase().includes("deskripsi") ||
                  field.toLowerCase().includes("keterangan") ||
                  field.toLowerCase().includes("alamat") ? (
                    <textarea
                      id={field}
                      name={field}
                      value={stringValue}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : field.toLowerCase().includes("role") ||
                    field.toLowerCase().includes("status") ||
                    field.toLowerCase().includes("metode") ? (
                    <select
                      id={field}
                      name={field}
                      value={stringValue}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Pilih {fieldLabel}</option>
                      {/* Role - untuk tb_user */}
                      {field === "role" && (
                        <>
                          <option value="Admin">Admin</option>
                          <option value="User">User</option>
                        </>
                      )}
                      {/* Status Kamar - untuk tb_kamar */}
                      {field === "statusKamar" && (
                        <>
                          <option value="Tersedia">Tersedia</option>
                          <option value="Tersewa">Tersewa</option>
                          <option value="TidakTersedia">Tidak Tersedia</option>
                        </>
                      )}
                      {/* Status Pembayaran - untuk tb_order & tb_riwayat_pembayaran */}
                      {(field === "statusPembayaran" ||
                        field === "statusPembayaranLama" ||
                        field === "statusPembayaranBaru") && (
                        <>
                          <option value="Lunas">Lunas</option>
                          <option value="Pending">Pending</option>
                          <option value="Expired">Expired</option>
                          <option value="Dibatalkan">Dibatalkan</option>
                        </>
                      )}
                      {/* Metode Pembayaran - untuk tb_order & tb_riwayat_pembayaran */}
                      {field === "metodePembayaran" && (
                        <>
                          <option value="Transfer">Transfer</option>
                          <option value="Tunai">Tunai</option>
                        </>
                      )}
                    </select>
                  ) : (
                    <input
                      type={inputType}
                      id={field}
                      name={field}
                      value={stringValue}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>
              );
            })}

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>
              <Link
                href={redirectPath}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 text-center"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CONTOH PENGGUNAAN DI HALAMAN EDIT USER
// File: app/user/edit/[id]/page.tsx
// ============================================
/*
"use client";

import EditDataPage from "@/components/EditDataPage";

export default function EditUserPage() {
  return (
    <EditDataPage
      dataType="user"
      redirectPath="/user"
      title="Edit Data User"
    />
  );
}
*/

// ============================================
// CONTOH PENGGUNAAN DI HALAMAN EDIT KAMAR
// File: app/kamar/edit/[id]/page.tsx
// ============================================
/*
"use client";

import EditDataPage from "@/components/EditDataPage";

export default function EditKamarPage() {
  return (
    <EditDataPage
      dataType="kamar"
      redirectPath="/kamar"
      title="Edit Data Kamar"
    />
  );
}
*/

// ============================================
// CONTOH PENGGUNAAN DI HALAMAN EDIT FASILITAS
// File: app/fasilitas/edit/[id]/page.tsx
// ============================================
/*
"use client";

import EditDataPage from "@/components/EditDataPage";

export default function EditFasilitasPage() {
  return (
    <EditDataPage
      dataType="fasilitas"
      redirectPath="/fasilitas"
      title="Edit Data Fasilitas"
    />
  );
}
*/

// ============================================
// CONTOH PENGGUNAAN DI HALAMAN EDIT PERABOTAN
// File: app/perabotan/edit/[id]/page.tsx
// ============================================
/*
"use client";

import EditDataPage from "@/components/EditDataPage";

export default function EditPerabotanPage() {
  return (
    <EditDataPage
      dataType="perabotan"
      redirectPath="/perabotan"
      title="Edit Data Perabotan"
    />
  );
}
*/
