"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface AddDataFormProps {
  dataType: "user" | "kamar" | "fasilitas" | "perabotan";
  redirectPath: string;
  title: string;
  fields: FieldConfig[];
}

interface FieldConfig {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "date";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string | number;
}

export default function AddDataForm({
  dataType,
  redirectPath,
  title,
  fields,
}: AddDataFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const initialData: Record<string, unknown> = {};
    fields.forEach((field) => {
      initialData[field.name] = field.defaultValue || "";
    });
    return initialData;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle perubahan input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Convert to number if type is number
    const finalValue =
      type === "number" && value !== "" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `http://localhost:3001/api/${dataType}`,
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message || "Data berhasil ditambahkan");
        router.push(redirectPath);
        router.refresh();
      } else {
        toast.error(response.data.message || "Gagal menambahkan data");
      }
    } catch (error) {
      console.error("Error adding data:", error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.message ||
          "Terjadi kesalahan saat menambahkan data";
        toast.error(errorMessage);
      } else {
        toast.error("Terjadi kesalahan saat menambahkan data");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={String(formData[field.name] || "")}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={String(formData[field.name] || "")}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Pilih {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={
                      field.type === "number"
                        ? Number(formData[field.name] || 0)
                        : String(formData[field.name] || "")
                    }
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
            ))}

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
                  "Simpan Data"
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
