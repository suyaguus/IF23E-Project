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
import { useAuth } from "@/hooks/useAuth";
import { authFetcher } from "@/lib/fetchers/authFetcher";
import { getErrorMessage } from "@/types/auth";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email wajib diisi";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password wajib diisi";
      isValid = false;
    }

    setFieldErrors(newErrors);

    if (!isValid) return;

    setIsLoading(true);

    try {
      const result = await authFetcher.login({ email, password });

      if (result.success && result.data && result.data.user) {
        toast.success("Login Berhasil!", {
          description: (
            <span className="text-white font-medium">
              Selamat datang {result.data.user.username}!
            </span>
          ),
        });
        login(result.data.user);
        if (result.data.user.role === "Admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/user");
        }
      } else {
        toast.error("Login Gagal", {
          description: (
            <span className="text-white font-medium">
              {result.message || "Periksa kembali email dan password Anda."}
            </span>
          ),
        });
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      const msg = getErrorMessage(err);
      toast.error("Terjadi Kesalahan", {
        description: <span className="text-red-500 font-medium">{msg}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`w-full ${className || ""}`} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Masukkan email dan password Anda untuk login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email)
                  setFieldErrors({ ...fieldErrors, email: "" });
              }}
              required
              disabled={isLoading}
              className={
                fieldErrors.email
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }
            />
            {fieldErrors.email && (
              <span className="text-xs text-red-500 font-medium">
                {fieldErrors.email}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password)
                    setFieldErrors({ ...fieldErrors, password: "" });
                }}
                required
                disabled={isLoading}
                className={`pr-10 ${
                  fieldErrors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
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
            {fieldErrors.password && (
              <span className="text-xs text-red-500 font-medium">
                {fieldErrors.password}
              </span>
            )}
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
