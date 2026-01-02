"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SharedProfileForm } from "@/components/ui/custom/CustomProfile";

export default function AdminProfilePage() {
  return (
    <div>
      <AppSidebar />

      <SharedProfileForm role="admin" />
    </div>
  );
}
