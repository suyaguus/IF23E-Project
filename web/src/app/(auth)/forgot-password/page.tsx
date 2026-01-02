"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2, ChevronLeft, Eye, EyeOff } from "lucide-react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ForgotPasswordPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromQuery = searchParams.get("email");

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);

  // State Form
  const [emailInput, setEmailInput] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (emailFromQuery && step === 1) {
      setStep(2);
    }
  }, [emailFromQuery, step]);

  // hanle otp
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });
      const data = await res.json();
      if (!res.ok || data.code !== 200)
        throw new Error(data.message || "Gagal mengirim OTP");

      toast.success("Kode OTP Terkirim!");

      router.push(`/forgot-password?email=${emailInput}`);

      setStep(2);
    } catch (error: unknown) {
      let msg = "Terjadi kesalahan";
      if (error instanceof Error) msg = error.message;
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // handle verify otp
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!emailFromQuery) {
      toast.error("Email tidak ditemukan.");
      setStep(1);
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailFromQuery, otp }),
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "OTP Salah");

      toast.success("OTP Valid!");
      setStep(3);
    } catch (error: unknown) {
      let msg = "Terjadi kesalahan";
      if (error instanceof Error) msg = error.message;
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!emailFromQuery) return;
    try {
      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailFromQuery, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Gagal reset password");

      toast.success("Password Berhasil Diubah!");

      router.push("/login");
    } catch (error: unknown) {
      toast.error("Gagal mereset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-[500px] shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-0 h-auto font-normal hover:bg-transparent text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </div>

        <CardTitle className="text-2xl font-bold">
          {step === 1 && "Lupa Password"}
          {step === 2 && "Verifikasi OTP"}
          {step === 3 && "Reset Password"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Masukkan email Anda untuk menerima kode verifikasi."}
          {step === 2 && (
            <span>
              Masukkan 6 digit kode yang telah dikirim ke{" "}
              <span className="font-semibold text-foreground">
                {emailFromQuery}
              </span>
            </span>
          )}
          {step === 3 && "Buat password baru untuk akun Anda."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : (
                "Kirim OTP"
              )}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="grid gap-6">
            <div className="flex justify-center w-full py-2">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={otp}
                onChange={setOtp}
                disabled={isLoading}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={0}
                    className="h-12 w-10 text-lg border rounded-md"
                  />
                  <InputOTPSlot
                    index={1}
                    className="h-12 w-10 text-lg border rounded-md"
                  />
                  <InputOTPSlot
                    index={2}
                    className="h-12 w-10 text-lg border rounded-md"
                  />
                  <InputOTPSlot
                    index={3}
                    className="h-12 w-10 text-lg border rounded-md"
                  />
                  <InputOTPSlot
                    index={4}
                    className="h-12 w-10 text-lg border rounded-md"
                  />
                  <InputOTPSlot
                    index={5}
                    className="h-12 w-10 text-lg border rounded-md"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || otp.length < 6}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : (
                "Verifikasi"
              )}
            </Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">Password Baru</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
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
              {isLoading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : (
                "Simpan Password"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
