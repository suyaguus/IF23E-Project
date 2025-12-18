"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin logout?")) {
      await logout();
    }
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
