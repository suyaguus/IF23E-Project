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
import { Switch } from "@/components/ui/switch";
import { User, Palette, Info, FileText, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { SharedProfileForm } from "./CustomProfile";

interface SharedSettingsFormProps {
  role: "admin" | "user" | "guest";
}

export function SharedSettingsForm({ role }: SharedSettingsFormProps) {
  const router = useRouter();
  const isGuest = role === "guest";
  const defaultTab = isGuest ? "appearance" : "profile";

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col lg:flex-row">
        <Tabs
          defaultValue={defaultTab}
          className="w-full flex flex-col lg:flex-row gap-6"
        >
          <aside className="lg:w-1/4 lg:border-r lg:pr-10 pb-6 lg:pb-0">
            <TabsList className="flex flex-col h-auto w-full items-start justify-start gap-1 bg-transparent p-0 text-muted-foreground">
              {!isGuest && (
                <TabsTrigger
                  value="profile"
                  className="w-full justify-start px-3 py-2 text-left gap-2 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:text-primary data-[state=active]:font-semibold"
                >
                  <User className="w-4 h-4" />
                  Profil & Akun
                </TabsTrigger>
              )}

              <TabsTrigger
                value="appearance"
                className="w-full justify-start px-3 py-2 text-left gap-2 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:text-primary data-[state=active]:font-semibold"
              >
                <Palette className="w-4 h-4" />
                Tampilan
              </TabsTrigger>

              <TabsTrigger
                value="about"
                className="w-full justify-start px-3 py-2 text-left gap-2 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:text-primary data-[state=active]:font-semibold"
              >
                <Info className="w-4 h-4" />
                Tentang
              </TabsTrigger>

              <TabsTrigger
                value="privacy"
                className="w-full justify-start px-3 py-2 text-left gap-2 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:text-primary data-[state=active]:font-semibold"
              >
                <FileText className="w-4 h-4" />
                Kebijakan Privasi
              </TabsTrigger>
            </TabsList>

            {isGuest && (
              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Login untuk mengelola profil dan keamanan Anda.
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

          <div className="flex-1 lg:pl-3 pt-6 lg:pt-0">
            {!isGuest && (
              <TabsContent
                value="profile"
                className="mt-0 border-none p-0 shadow-none"
              >
                <SharedProfileForm role={role as "admin" | "user"} />
              </TabsContent>
            )}

            <TabsContent
              value="appearance"
              className="space-y-6 mt-0 outline-none"
            >
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
                        Aktifkan tampilan gelap.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Tentang Wisma Dempo</CardTitle>
                  <CardDescription>
                    Informasi sistem manajemen kos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                  <p className="mb-4">
                    <strong>Versi 1.0.0 (Production)</strong>
                  </p>
                  <p>
                    Sistem ini dikembangkan untuk memudahkan pengelolaan
                    penghuni dan pembayaran di Wisma Dempo.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Kebijakan Privasi</CardTitle>
                  <CardDescription>
                    Data Anda aman bersama kami.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-4">
                  <p>
                    Kami hanya mengumpulkan data yang diperlukan untuk identitas
                    penghuni dan proses penagihan bulanan.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
