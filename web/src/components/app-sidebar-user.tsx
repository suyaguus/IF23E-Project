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
import { NavUser } from "@/components/nav-user";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard/user",
    icon: IconLayoutDashboard,
  },
  {
    title: "Kamar",
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

  const [currentUser, setCurrentUser] = useState({
    name: "Penghuni Kos",
    email: "user@example.com",
    avatar: "",
  });

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
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconBed className="size-4" />
          </div>
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
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
