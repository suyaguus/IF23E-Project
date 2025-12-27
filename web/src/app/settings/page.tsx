"use client";

import { SharedSettingsForm } from "@/components/ui/custom/CustomSetting";
import { Separator } from "@/components/ui/separator";

export default function GuestSettingsPage() {
  return (
    <div className="container py-8 max-w-5xl">
      {/* --- BAGIAN JUDUL & DESKRIPSI --- */}
      <section className="mb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Pengaturan Aplikasi
          </h2>
          <p className="text-muted-foreground text-lg">
            Sesuaikan preferensi tampilan dan pelajari lebih lanjut mengenai
            sistem manajemen Wisma Dempo.
          </p>
        </div>
        <Separator className="mt-6" />
      </section>

      {/* --- KOMPONEN REUSABLE SETTINGS --- */}
      <SharedSettingsForm role="guest" />
    </div>
  );
}
