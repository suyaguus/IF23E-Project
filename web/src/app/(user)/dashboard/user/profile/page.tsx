"use client";

import { SharedProfileForm } from "@/components/ui/custom/CustomProfile";

export default function UserProfilePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile Saya</h2>
      </div>
      <SharedProfileForm role="user" />
    </div>
  );
}
