"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react"; // Icon Logout
import { toast } from "sonner";

// Import UI Components (Shadcn)
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // Atau SidebarMenuButton

// Import Auth Logic (Biar konsisten)
import { useAuth } from "@/context/AuthContext";
// ATAU jika belum pakai context, pakai authFetcher langsung:
// import { authFetcher } from "@/lib/fetchers/authFetcher";

interface UserLogoutButtonProps {
  variant?: "sidebar" | "button"; // Opsi tampilan: menu sidebar atau tombol biasa
  isMobile?: boolean;
}

export function LogoutButton({
  variant = "button",
}: {
  variant?: "sidebar" | "button";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Jika sudah pakai Context:
  const { logout } = useAuth();

  // --- LOGIKA LOGOUT ---
  const handleLogout = async () => {
    setLoading(true);
    try {
      // 1. Panggil fungsi logout dari Context (atau Fetcher)
      // Ini sudah handle API call + localStorage + Redirect
      logout();

      // Jika manual pakai fetcher:
      // await authFetcher.logout({ userId: ..., email: ... });
      // localStorage.removeItem("user_session");
      // router.replace("/auth/login");
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Gagal logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      {/* 1. TRIGGER: Tombol yang memunculkan Dialog */}
      <AlertDialogTrigger asChild>
        {variant === "sidebar" ? (
          // Opsi A: Tampilan Sidebar Menu Item
          <button className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors text-left">
            <LogOut className="h-4 w-4" />
            <span>Keluar Aplikasi</span>
          </button>
        ) : (
          // Opsi B: Tampilan Tombol Biasa (misal di halaman Profile)
          <Button variant="destructive" className="w-full sm:w-auto gap-2">
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        )}
      </AlertDialogTrigger>

      {/* 2. CONTENT: Isi Dialog Konfirmasi */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin mengakhiri sesi ini? Anda harus login
            kembali untuk mengakses akun Anda.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* Tombol Batal */}
          <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>

          {/* Tombol Eksekusi (Merah) */}
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault(); // Mencegah dialog tutup otomatis sebelum async selesai
              handleLogout();
            }}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={loading}
          >
            {loading ? "Keluar..." : "Ya, Keluar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
