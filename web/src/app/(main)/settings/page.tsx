"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Pastikan install switch: npx shadcn@latest add switch
import { User, Shield, Palette, Info, FileText, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Import hook auth kita

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth(); // Ambil data user
  const isGuest = !user; // Status Tamu

  // Tentukan Tab Default: Kalau Guest ke 'appearance', kalau User ke 'profile'
  const defaultTab = isGuest ? "appearance" : "profile";

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground">
          {isGuest
            ? "Sesuaikan preferensi tampilan aplikasi."
            : "Kelola pengaturan akun dan preferensi aplikasi Anda."}
        </p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <Tabs
          defaultValue={defaultTab}
          className="w-full flex flex-col lg:flex-row gap-6"
        >
          {/* --- SIDEBAR MENU (KIRI) --- */}
          <aside className="lg:w-1/5">
            <TabsList className="flex flex-col h-auto w-full items-start justify-start gap-1 bg-transparent p-0 text-muted-foreground">
              {/* MENU KHUSUS USER LOGIN (Disembunyikan jika Guest) */}
              {!isGuest && (
                <>
                  <TabsTrigger
                    value="profile"
                    className="w-full justify-start px-3 py-2 text-left gap-2 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:font-semibold"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="account"
                    className="w-full justify-start px-3 py-2 text-left gap-2 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:font-semibold"
                  >
                    <Shield className="w-4 h-4" />
                    Akun
                  </TabsTrigger>
                </>
              )}

              {/* MENU UMUM (GUEST & USER BISA LIHAT) */}
              <TabsTrigger
                value="appearance"
                className="w-full justify-start px-3 py-2 text-left gap-2 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:font-semibold"
              >
                <Palette className="w-4 h-4" />
                Tampilan
              </TabsTrigger>

              <TabsTrigger
                value="about"
                className="w-full justify-start px-3 py-2 text-left gap-2 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:font-semibold"
              >
                <Info className="w-4 h-4" />
                Tentang
              </TabsTrigger>

              <TabsTrigger
                value="privacy"
                className="w-full justify-start px-3 py-2 text-left gap-2 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:font-semibold"
              >
                <FileText className="w-4 h-4" />
                Kebijakan Privasi
              </TabsTrigger>
            </TabsList>

            {/* CTA Login untuk Guest */}
            {isGuest && (
              <div className="mt-8 p-4 bg-muted/50 rounded-lg border text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Login untuk akses fitur profil dan akun.
                </p>
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full"
                  size="sm"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login Sekarang
                </Button>
              </div>
            )}
          </aside>

          {/* --- ISI KONTEN (KANAN) --- */}
          <div className="flex-1 lg:max-w-2xl">
            {/* KONTEN: TAMPILAN (UMUM) */}
            <TabsContent value="appearance" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Tampilan Aplikasi</CardTitle>
                  <CardDescription>
                    Sesuaikan tema aplikasi (Dark/Light Mode).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Mode Gelap</Label>
                      <p className="text-sm text-muted-foreground">
                        Aktifkan tampilan gelap untuk kenyamanan mata.
                      </p>
                    </div>
                    {/* Placeholder Switch - Logic Theme belum dipasang */}
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* KONTEN: TENTANG (UMUM) */}
            <TabsContent value="about" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Tentang Aplikasi Kos</CardTitle>
                  <CardDescription>
                    Informasi versi dan pengembang.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="mb-2">
                      <strong>Aplikasi Pengelola Kos v1.0.0</strong>
                    </p>
                    <p className="mb-4">
                      Aplikasi ini dirancang untuk memudahkan manajemen rumah
                      kos, mulai dari pendataan penghuni, pembayaran, hingga
                      pengelolaan fasilitas. Dibuat sebagai proyek Tugas Akhir
                      Semester 5.
                    </p>
                    <p>&copy; 2025 IF23E Project. All rights reserved.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* KONTEN: PRIVACY POLICY (UMUM) */}
            <TabsContent value="privacy" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Kebijakan Privasi</CardTitle>
                  <CardDescription>
                    Bagaimana kami mengelola data Anda.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
                  <div className="text-sm text-muted-foreground space-y-4">
                    <p>
                      Kami sangat menghargai privasi Anda. Kebijakan ini
                      menjelaskan bagaimana kami mengumpulkan, menggunakan, dan
                      melindungi informasi pribadi Anda.
                    </p>
                    <h4 className="font-semibold text-foreground">
                      1. Data yang Kami Kumpulkan
                    </h4>
                    <p>
                      Kami mengumpulkan informasi seperti nama, alamat email,
                      dan nomor telepon saat Anda mendaftar akun.
                    </p>
                    <h4 className="font-semibold text-foreground">
                      2. Penggunaan Data
                    </h4>
                    <p>
                      Data digunakan untuk keperluan manajemen kos, komunikasi
                      tagihan, dan verifikasi identitas penghuni.
                    </p>
                    {/* Anda bisa memindahkan isi teks panjang dari file privacy-policy/page.tsx kesini */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* KONTEN KHUSUS USER (Hanya dirender jika user login) */}
            {!isGuest && (
              <>
                <TabsContent value="profile" className="space-y-6 mt-0">
                  <div className="p-4 border rounded-lg bg-muted/20">
                    <h3 className="text-lg font-medium">Pengaturan Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      Form edit profile akan muncul di sini (gunakan komponen
                      ProfileForm).
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="account" className="space-y-6 mt-0">
                  <div className="p-4 border rounded-lg bg-muted/20">
                    <h3 className="text-lg font-medium">Keamanan Akun</h3>
                    <p className="text-sm text-muted-foreground">
                      Form ganti password akan muncul di sini.
                    </p>
                  </div>
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
