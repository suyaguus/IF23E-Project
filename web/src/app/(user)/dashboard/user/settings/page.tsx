"use client";

import { SharedSettingsForm } from "@/components/ui/custom/CustomSetting";

export default function UserSettingsPage() {
  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Pengaturan Saya</h2>
        <p className="text-muted-foreground">Kelola preferensi akun penghuni Anda.</p>
      </div>
      <SharedSettingsForm role="user" />
    </div>
  );
}