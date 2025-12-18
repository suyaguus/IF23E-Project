"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Camera, ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
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
// --- INTERFACE DEFINITIONS ---
interface UserProfileState {
  id: number;
  username: string;
  email: string;
  notelp: string;
  avatar: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // --- TAMBAHKAN STATE INI ---
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // State Profil Umum
  const [user, setUser] = useState<UserProfileState>({
    id: 0,
    username: "",
    email: "",
    notelp: "",
    avatar: "",
  });

  // State Password (REVISI: Hapus confirmPassword)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  // Load Data User
  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString) {
      try {
        const storedUser = JSON.parse(storedUserString);
        setUser({
          id: storedUser.id || 0,
          username: storedUser.username || "",
          email: storedUser.email || "",
          notelp: storedUser.notelp || "",
          avatar: "",
        });
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  // Handler Input Profil
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  // Handler Input Password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  // --- FUNGSI 1: SIMPAN PROFIL ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        username: user.username,
        notelp: user.notelp,
      };

      const response = await fetch(
        `http://localhost:3001/api/auth/change-password"`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal mengupdate data");
      }

      const oldLocalStorage = JSON.parse(localStorage.getItem("user") || "{}");
      const newUserData = {
        ...oldLocalStorage,
        username: user.username,
        notelp: user.notelp,
      };
      localStorage.setItem("user", JSON.stringify(newUserData));

      toast.success(result.message);
      router.refresh();
    } catch (error: unknown) {
      console.error("Update error:", error);
      let msg = "Terjadi kesalahan saat menyimpan";
      if (error instanceof Error) msg = error.message;
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNGSI 2: UPDATE PASSWORD (REVISI) ---
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi Frontend (Hapus validasi confirm password)
    if (passwordData.newPassword.length < 6) {
      toast.error("Password baru minimal 6 karakter");
      return;
    }

    setIsPasswordLoading(true);

    try {
      // PERBAIKAN DI SINI:
      // Ganti '/api/user/change-password' menjadi '/api/auth/change-password'
      // Sesuai dengan struktur folder di screenshot Anda (folder 'auth')
      const response = await fetch(
        "http://localhost:3001/api/auth/change-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      // ... sisa kode handling response sama ...
    } catch (error: unknown) {
      // ... error handling ...
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
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg">
                      {user.username.substring(0, 2).toUpperCase()}
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
                      value={user.username}
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
                      value={user.email}
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
                      value={user.notelp}
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

        {/* TAB 2: UPDATE PASSWORD (REVISI) */}

        {/* TAB 2: UPDATE PASSWORD */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Ubah password akun Anda di sini. Anda akan diminta login ulang.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {/* --- Input Password Lama --- */}
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Password Saat Ini</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      // 1. Ubah type secara dinamis berdasarkan state
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      // 2. Tambahkan padding-right (pr-10) agar teks tidak menabrak ikon
                      className="pr-10"
                    />
                    {/* 3. Tombol Icon Mata */}
                    <button
                      type="button" // PENTING: gunakan type="button" agar tidak mensubmit form
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground transition-all"
                      tabIndex={-1} // Opsional: agar tombol ini dilewati saat user menekan Tab
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showCurrentPassword
                          ? "Sembunyikan password"
                          : "Lihat password"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* --- Input Password Baru --- */}
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      // 1. Ubah type secara dinamis berdasarkan state
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      // 2. Tambahkan padding-right (pr-10)
                      className="pr-10"
                    />
                    {/* 3. Tombol Icon Mata */}
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
                      <span className="sr-only">
                        {showNewPassword
                          ? "Sembunyikan password"
                          : "Lihat password"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Tombol Submit */}
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
