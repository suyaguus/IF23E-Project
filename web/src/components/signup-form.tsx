"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // 1. Import Icon Mata
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // Pastikan sonner sudah terinstall

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 2. State untuk toggle password show/hide
  const [showPassword, setShowPassword] = useState(false);

  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    notelp: "",
  });

  // Handler untuk mengubah nilai input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handler saat form disubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mendaftar");
      }

      if (result.success) {
        // 3. Tampilkan Toast Sukses
        toast.success("Pendaftaran berhasil! Silakan login.");

        // Beri sedikit jeda agar user bisa baca toast sebelum redirect (opsional)
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      }
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message);
        // Opsional: Tampilkan toast error juga
        toast.error(err.message);
      } else if (typeof err === "string") {
        setError(err);
        toast.error(err);
      } else {
        setError("Terjadi kesalahan pada server");
        toast.error("Terjadi kesalahan pada server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Menampilkan pesan error visual (opsional karena sudah ada toast) */}
          {error && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}

          <FieldGroup className="space-y-4">
            {/* Field Username */}
            <Field>
              <FieldLabel htmlFor="username">Full Name (Username)</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="John Doe"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </Field>

            {/* Field Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </Field>

            {/* Field No Telp */}
            <Field>
              <FieldLabel htmlFor="notelp">Phone Number</FieldLabel>
              <Input
                id="notelp"
                type="text"
                placeholder="08123456789"
                value={formData.notelp}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </Field>

            {/* Field Password dengan Icon Mata */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  // 4. Ubah tipe input dinamis berdasarkan state
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  // Tambahkan padding kanan agar teks tidak tertutup icon
                  className="pr-10"
                />
                <button
                  type="button" // PENTING: type="button" agar tidak submit form
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1} // Agar tidak bisa di-tab focus (opsional)
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
              <FieldDescription>
                Must be at least 6 characters long.
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <FieldDescription className="px-6 text-center mt-4">
                  Already have an account?{" "}
                  <a
                    href="/auth/login"
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
