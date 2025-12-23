"use client"

import * as React from "react"
import {
  IconLayoutDashboard,
  IconBed,
  IconReceipt2,
  IconMessageReport,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react"

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
} from "@/components/ui/sidebar"

// Navigasi khusus untuk Penghuni 
const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard-user",
    icon: IconLayoutDashboard,
  },
  {
    title: "Kamar Saya",
    url: "/dashboard-user/kamar",
    icon: IconBed,
  },
  {
    title: "Riwayat Pembayaran",
    url: "/dashboard-user/pembayaran",
    icon: IconReceipt2,
  },
  {
    title: "Laporan Kerusakan",
    url: "/dashboard-user/laporan",
    icon: IconMessageReport,
  },
]

const secondaryNav = [
  {
    title: "Profil Saya",
    url: "/dashboard-user/profile",
    icon: IconUser,
  },
  {
    title: "Pengaturan",
    url: "/dashboard-user/settings",
    icon: IconSettings,
  },
]

export function AppSidebarUser({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-12 border-b flex items-center px-6">
        <span className="font-bold text-lg tracking-tight">KOS<span className="text-primary">KU</span></span>
      </SidebarHeader>

      <SidebarContent>
        {/* Grup Menu Utama */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grup Menu Akun */}
        <SidebarGroup>
          <SidebarGroupLabel>Akun</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive hover:text-destructive">
              <IconLogout />
              <span>Keluar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}