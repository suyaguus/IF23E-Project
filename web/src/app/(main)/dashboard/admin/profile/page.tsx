"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SharedProfileForm } from "@/components/ui/custom/CustomProfile";

export default function AdminProfilePage() {
  return (
    <main>
      <AppSidebar />

      <SharedProfileForm role="admin" />
    </main>
  );
}
