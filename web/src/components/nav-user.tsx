"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronsUpDown, LogOut, User, Settings, LogIn } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";

export function NavUser({
  user: propUser,
}: {
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  // State untuk Dialog Logout
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Ambil data real-time dari AuthContext
  const { user: authUser, logout } = useAuth();

  // --- LOGIC PENENTUAN STATUS USER ---
  const isLoggedIn = !!authUser;

  const isAdmin = authUser?.role === "Admin";

  const profileUrl = isAdmin
    ? "/dashboard/admin/profile"
    : "/dashboard/user/profile";

  const settingUrl = isAdmin
    ? "/dashboard/admin/settings"
    : "/dashboard/user/settings";

  const activeUser = {
    name: isLoggedIn
      ? authUser?.username || propUser?.name || ""
      : "Tamu (Guest)",
    email: isLoggedIn
      ? authUser?.email || propUser?.email || ""
      : "Silakan Login",
    avatar: isLoggedIn ? propUser?.avatar || "" : "",
  };

  const getInitials = (name: string) => {
    if (!name || name === "Tamu (Guest)") return "GU";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return parts
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutDialog(false); // Tutup dialog setelah logout
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            {/* asChild WAJIB ada agar SidebarMenuButton menjadi trigger langsung 
                tanpa membuat button baru di luarnya */}
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={activeUser.avatar} alt={activeUser.name} />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(activeUser.name || "")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeUser.name}
                  </span>
                  <span className="truncate text-xs">{activeUser.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={activeUser.avatar}
                      alt={activeUser.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {getInitials(activeUser.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {activeUser.name}
                    </span>
                    <span className="truncate text-xs">{activeUser.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {isLoggedIn ? (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push(profileUrl)}>
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(settingUrl)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  {/* PERBAIKAN LOGOUT: Gunakan state, jangan wrap dengan Trigger */}
                  <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/login")}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Dialog Logout ditaruh di luar struktur Menu untuk menghindari nesting error */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin keluar? Sesi Anda akan diakhiri.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogoutConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ya, Keluar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
