"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Camera,
  ChevronLeft,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// --- IMPORT HOOK & FETCHER ---
import { useAuth } from "@/hooks/useAuth";
import { authFetcher } from "@/lib/fetchers/authFetcher";
import { getErrorMessage } from "@/types/auth";

export default function ProfilePage() {
  const router = useRouter();

  // 1. Ambil data user GLOBAL dari Context
  // Kita namakan 'authUser' agar tidak bentrok dengan state local
  const { user: authUser, login: updateAuthUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // 2. State LOCAL untuk menampung inputan form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    notelp: "",
    avatar: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // 3. EFFECT: Cek Login & Isi Form saat halaman dimuat
  useEffect(() => {
    // Cek manual localStorage sebagai fallback cepat jika context belum siap
    const localUser = localStorage.getItem("user");

    if (!localUser && !authUser) {
      // Jika tidak ada data user, lempar ke login
      router.push("/login"); // URL YANG BENAR (Tanpa /auth)
    } else if (authUser) {
      // Jika authUser ada, isi form dengan data tersebut
      setFormData({
        username: authUser.username || "",
        email: authUser.email || "",
        notelp: authUser.notelp || "",
        avatar: authUser.avatar || "",
      });
    }
  }, [authUser, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  // --- FUNGSI 1: UPDATE PROFILE (Pakai authFetcher) ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser) return; // Guard clause

    setIsLoading(true);

    try {
      // PERBAIKAN DISINI:
      // Kita kirim 1 object saja yang berisi email (kunci) dan data update
      const result = await authFetcher.updateProfile({
        email: authUser.email, // <--- PENTING: Email dari context user
        username: formData.username,
        notelp: formData.notelp,
      });

      if (result.success) {
        // Update Local Storage & Context
        const updatedUser = {
          ...authUser,
          username: formData.username,
          notelp: formData.notelp,
        };

        // Update Context (dan localStorage otomatis di handle context biasanya, tapi kita paksa update disini juga)
        updateAuthUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("Profil Berhasil Diperbarui", {
          description: (
            <span className="text-white font-medium">
              Data diri Anda telah tersimpan.
            </span>
          ),
        });
        router.refresh();
      } else {
        toast.error("Gagal Update Profil", {
          description: result.message,
        });
      }
    } catch (error: unknown) {
      console.error("Update error:", error);
      const msg = getErrorMessage(error);
      toast.error("Terjadi Kesalahan", {
        description: <span className="text-white font-medium">{msg}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNGSI 2: UPDATE PASSWORD (Pakai authFetcher) ---
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser) return;

    // Validasi panjang password
    if (passwordData.newPassword.length < 6) {
      toast.error("Password Terlalu Pendek", {
        description: (
          <span className="text-white font-medium">
            Password baru minimal 6 karakter
          </span>
        ),
      });
      return;
    }

    setIsPasswordLoading(true);

    try {
      // PERBAIKAN DI SINI:
      // Kirim 'email', bukan 'userId'
      const result = await authFetcher.changePassword({
        email: authUser.email, // <--- Gunakan Email dari Context
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (result.success) {
        toast.success("Password Berhasil Diubah!", {
          description: (
            <span className="text-white font-medium">
              Silakan login kembali dengan password baru Anda.
            </span>
          ),
          duration: 3000,
        });

        // Opsional: Reset form
        setPasswordData({ currentPassword: "", newPassword: "" });
      } else {
        toast.error("Gagal Mengubah Password", {
          description: (
            <span className="text-white font-medium">
              {result.message || "Periksa password lama Anda."}
            </span>
          ),
        });
      }
    } catch (error: unknown) {
      console.error("Password update error:", error);
      const msg = getErrorMessage(error);
      toast.error("Terjadi Kesalahan", {
        description: <span className="text-white font-medium">{msg}</span>,
      });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Kembali</span>
        </Button>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Pengaturan Akun</h2>
          <p className="text-muted-foreground">
            Kelola profil akun dan preferensi keamanan Anda.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
        </TabsList>

        {/* TAB 1: PROFIL UMUM */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profil Saya</CardTitle>
              <CardDescription>
                Informasi ini akan ditampilkan secara publik.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Foto Profil */}
              <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.avatar} />
                    <AvatarFallback className="text-lg">
                      {formData.username
                        ? formData.username.substring(0, 2).toUpperCase()
                        : "US"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Foto Profil</h3>
                  <p className="text-sm text-muted-foreground">
                    Klik gambar untuk mengubah foto.
                    <br />
                    Format: JPG, PNG (Max 2MB).
                  </p>
                </div>
              </div>

              <Separator />

              {/* Form Profil */}
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      className="pl-9"
                      value={formData.username} // Pakai formData
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-9 bg-muted"
                      value={formData.email} // Pakai formData
                      disabled
                    />
                  </div>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Email tidak dapat diubah.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notelp">Nomor Telepon</Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="notelp"
                      className="pl-9"
                      value={formData.notelp} // Pakai formData
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: UPDATE PASSWORD */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Ubah password akun Anda di sini.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {/* Input Password Lama */}
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Password Saat Ini</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground transition-all"
                      tabIndex={-1}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Input Password Baru */}
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground transition-all"
                      tabIndex={-1}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={isPasswordLoading}
                  >
                    {isPasswordLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isPasswordLoading ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
