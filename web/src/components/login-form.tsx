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
// Import cn utility jika Anda memilikinya (biasanya ada di shadcn),
// tapi jika tidak, kita pakai cara manual di bawah.
// import { cn } from "@/lib/utils";

// ... (Interface User, LoginResponse, ApiError TETAP SAMA, tidak perlu diubah) ...

// PERUBAHAN 1: Terima props 'className' dan '...props' lainnya
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  // ... (State variables TETAP SAMA) ...
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ... (handleSubmit Logic TETAP SAMA) ...
  const handleSubmit = async (e: React.FormEvent) => {
    // Copy paste logic submit Anda yang tadi di sini
    e.preventDefault();
    // ... logic login ...
  };

  return (
    // PERUBAHAN 2: Hapus 'max-w-md' dan 'mx-auto' yang hardcoded.
    // Ganti dengan {...props} agar styling dari luar bisa masuk.
    // Tambahkan class w-full agar responsif mengikuti container pembungkusnya.
    <Card className={`w-full ${className || ""}`} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Masukkan email dan password Anda untuk login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* ... (Isi Form TETAP SAMA persis seperti sebelumnya) ... */}
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
                href="/forgot-password" // Link sudah benar (tanpa /auth)
                className="ml-auto inline-block text-sm underline"
              >
                Lupa password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground transition-all"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <Link href="/signup" className="underline">
            Daftar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
