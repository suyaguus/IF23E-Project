"use client";

import { SharedProfileForm } from "@/components/ui/custom/CustomProfile";

export default function UserProfilePage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-8">
      <SharedProfileForm role="user" />
    </div>
  );
}
