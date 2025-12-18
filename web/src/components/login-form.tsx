"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

// Type definitions
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  notelp?: string;
  createdAt: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

interface ApiError {
  success: boolean;
  message: string;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        mode: "cors",
      });

      const result: LoginResponse | ApiError = await response.json();

      if (response.ok && result.success) {
        const loginResult = result as LoginResponse;

        // Simpan data user ke localStorage
        localStorage.setItem("user", JSON.stringify(loginResult.data.user));

        // Redirect berdasarkan role
        if (loginResult.data.user.role === "Admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/admin");
        }
      } else {
        setError(result.message || "Login gagal");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Tidak dapat terhubung ke server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Masukkan email dan password Anda untuk login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Lupa password?
              </Link>
            </div>

            {/* WRAPPER RELATIVE UNTUK POSISI ICON */}
            <div className="relative">
              <Input
                id="password"
                // 1. Ubah type secara dinamis berdasarkan state
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                // 2. Tambahkan padding-right (pr-10) agar teks tidak menabrak ikon
                className="pr-10"
              />

              {/* 3. Tombol Icon Mata */}
              <button
                type="button" // PENTING: agar tidak men-submit form saat diklik
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground transition-all"
                tabIndex={-1} // Opsional: agar tidak bisa di-tab (fokus tetap di input)
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Sembunyikan password" : "Lihat password"}
                </span>
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          {/* 3. Gunakan Link juga di sini agar lebih cepat */}
          <Link href="/auth/signup" className="underline">
            Daftar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
