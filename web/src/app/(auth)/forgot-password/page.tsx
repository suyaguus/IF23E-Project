"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { REGEXP_ONLY_DIGITS } from "input-otp";

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
import { Loader2, ChevronLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromQuery = searchParams.get("email");

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (emailFromQuery && step === 1) {
      setStep(2);
    }
  }, [emailFromQuery, step]);

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

      if (!res.ok || data.code !== 200) {
        throw new Error(data.message || "Gagal mengirim OTP");
      }

      toast.success("Kode OTP terkirim!");

      router.push(`/auth/forgot-password?email=${emailInput}`);

      setStep(2);
    } catch (error: unknown) {
      let msg = "Terjadi kesalahan sistem";

      if (error instanceof Error) {
        msg = error.message;
      } else if (typeof error === "string") {
        msg = error;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        msg = String((error as { message: unknown }).message);
      }

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!emailFromQuery) {
      toast.error("Email tidak ditemukan. Silakan ulangi proses.");
      setStep(1);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailFromQuery,
          otp: otp,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "OTP Salah");
      }

      toast.success("OTP Valid! Silakan buat password baru.");
      setStep(3);
    } catch (error: unknown) {
      let msg = "Terjadi kesalahan";
      if (error instanceof Error) msg = error.message;
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!emailFromQuery) return;

    try {
      const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailFromQuery,
          otp,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal mereset password");
      }

      toast.success("Password berhasil diubah!");
      router.push("/auth/login");
    } catch (error: unknown) {
      toast.error("Gagal ganti password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <CardTitle>
              {step === 1 && "Lupa Password"}
              {step === 2 && "Verifikasi OTP"}
              {step === 3 && "Reset Password"}
            </CardTitle>
          </div>

          <CardDescription className="pt-2">
            {step === 1 && "Masukkan email untuk menerima kode."}
            {step === 2 && `Masukkan kode yang dikirim ke ${emailFromQuery}`}
            {step === 3 && "Buat password baru Anda."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Kirim OTP"}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otp}
                  onChange={setOtp}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || otp.length < 6}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Verifikasi"
                )}
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label>Password Baru</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Simpan"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
