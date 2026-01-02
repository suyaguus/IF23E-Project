"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Camera,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  KeyRound,
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
import { useAuth } from "@/hooks/useAuth";
import { authFetcher } from "@/lib/fetchers/authFetcher";
import { getErrorMessage } from "@/types/auth";

interface SharedProfileFormProps {
  role: "admin" | "user";
}

export function SharedProfileForm({ role }: SharedProfileFormProps) {
  const router = useRouter();
  const { user: authUser, login: updateAuthUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
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

  useEffect(() => {
    if (authUser) {
      setFormData({
        username: authUser.username || "",
        email: authUser.email || "",
        notelp: authUser.notelp || "",
        avatar: authUser.avatar || "",
      });
    }
  }, [authUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser) return;

    setIsLoading(true);
    try {
      const result = await authFetcher.updateProfile({
        email: authUser.email,
        username: formData.username,
        notelp: formData.notelp,
      });

      if (result.success) {
        const updatedUser = {
          ...authUser,
          username: formData.username,
          notelp: formData.notelp,
        };
        updateAuthUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success("Profil Berhasil Diperbarui", {
          description: "Data diri Anda telah tersimpan.",
        });
        router.refresh();
      } else {
        toast.error("Gagal Update Profil", { description: result.message });
      }
    } catch (error) {
      const msg = getErrorMessage(error);
      toast.error("Terjadi Kesalahan", { description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser) return;

    if (passwordData.newPassword.length < 6) {
      toast.error("Password Terlalu Pendek", {
        description: "Password baru minimal 6 karakter",
      });
      return;
    }

    setIsPasswordLoading(true);
    try {
      const result = await authFetcher.changePassword({
        email: authUser.email,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (result.success) {
        toast.success("Password Berhasil Diubah!", {
          description: "Silakan login kembali nanti dengan password baru.",
        });
        setPasswordData({ currentPassword: "", newPassword: "" });
      } else {
        toast.error("Gagal Mengubah Password", {
          description: result.message || "Periksa password lama Anda.",
        });
      }
    } catch (error) {
      const msg = getErrorMessage(error);
      toast.error("Terjadi Kesalahan", { description: msg });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        {role === "admin" ? (
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Shield className="h-8 w-8" />
          </div>
        ) : (
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <User className="h-8 w-8" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Pengaturan Akun {role === "admin" ? "Admin" : ""}
          </h2>
          <p className="text-muted-foreground">
            Kelola profil dan keamanan akun Anda.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="general" className="gap-2">
            <User className="h-4 w-4" />
            Umum
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <KeyRound className="h-4 w-4" />
            Keamanan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>
                Perbarui detail informasi akun Anda di sini.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Foto Profil */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group cursor-pointer">
                  <Avatar className="h-24 w-24 border-2 border-muted">
                    <AvatarImage
                      src={formData.avatar}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-bold bg-primary/5 text-primary">
                      {formData.username
                        ? formData.username.substring(0, 2).toUpperCase()
                        : "US"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white w-6 h-6" />
                  </div>
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="font-medium text-lg">Foto Profil</h3>
                  <p className="text-sm text-muted-foreground max-w-[250px]">
                    Klik gambar untuk mengubah. Format JPG, PNG (Max 2MB).
                  </p>
                </div>
              </div>

              <Separator />

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        className="pl-9"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username Anda"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notelp">Nomor Telepon</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="notelp"
                        className="pl-9"
                        value={formData.notelp}
                        onChange={handleChange}
                        placeholder="0812..."
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-9 bg-muted/50"
                      value={formData.email}
                      disabled
                    />
                  </div>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Email digunakan untuk login dan tidak dapat diubah.
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="min-w-[140px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ubah Password</CardTitle>
              <CardDescription>
                Pastikan menggunakan password yang kuat dan aman.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleUpdatePassword}
                className="space-y-4 max-w-lg"
              >
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Password Saat Ini</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="pr-10"
                      placeholder="Masukkan password lama"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="pr-10"
                      placeholder="Minimal 6 karakter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="default"
                    disabled={isPasswordLoading}
                  >
                    {isPasswordLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
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
