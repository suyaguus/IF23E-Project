"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconBed,
  IconReceipt2,
  IconMessageReport,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from "@/components/ui/sidebar";

// Import NavUser agar footer seragam dengan Admin
import { NavUser } from "@/components/nav-user";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard/user",
    icon: IconLayoutDashboard,
  },
  {
    title: "Kamar Saya",
    url: "/dashboard/user/kamar",
    icon: IconBed,
  },
  {
    title: "Riwayat Pembayaran",
    url: "/dashboard/user/pembayaran",
    icon: IconReceipt2,
  },
  {
    title: "Laporan Kerusakan",
    url: "/dashboard/user/laporan",
    icon: IconMessageReport,
  },
];

export function AppSidebarUser({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  // 1. State untuk User Data
  const [currentUser, setCurrentUser] = useState({
    name: "Penghuni Kos",
    email: "user@example.com",
    avatar: "",
  });

  // 2. Effect untuk ambil data dari LocalStorage saat component dimuat
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("user");

      if (storedUserString) {
        try {
          const storedUser = JSON.parse(storedUserString);
          setCurrentUser({
            name: storedUser.username || "Penghuni",
            email: storedUser.email || "user@kosku.com",
            avatar: storedUser.avatar || "",
          });
        } catch (error) {
          console.error("Gagal parsing user data:", error);
        }
      }
    }
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-12 border-b flex items-center px-4 justify-center lg:justify-start">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          {/* Icon Logo Kecil */}
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconBed className="size-4" />
          </div>
          {/* Teks Logo */}
          <span className="group-data-[collapsible=icon]:hidden">
            <span className="text-primary">Kost Wisma Dempo</span>
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. Footer Menggunakan NavUser (Seragam dengan Admin) */}
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
