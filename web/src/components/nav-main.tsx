"use client";

import {
  IconArmchair,
  IconBed,
  IconChairDirector,
  IconCirclePlusFilled,
  IconDashboard,
  IconFridge,
  IconMail,
  IconMenu,
  IconUser,
  type Icon,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {/* bagian judul */}
          <Link href="/dashboard/admin">
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Menu Dashboard"
                className="bg-transparent text-black hover:bg-transparent hover:border-2 hover:border-primary hover:text-black min-w-8 duration-200 ease-linear"
              >
                <IconDashboard />
                <span>Menu Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>

          {/* bagian user */}
          {/* <Link href="/user">
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Menu User"
                className="bg-transparent text-black hover:bg-transparent hover:border-2 hover:border-primary hover:text-black min-w-8 duration-200 ease-linear"
              >
                <IconUser />
                <span>Menu User</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link> */}

          {/* bagian kamar */}
          <Link href="/kamar">
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Menu Kamar"
                className="bg-transparent text-black hover:bg-transparent hover:border-2 hover:border-primary hover:text-black min-w-8 duration-200 ease-linear"
              >
                <IconBed />
                <span>Menu Kamar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>

          {/* bagian fasilitas */}
          <Link href="/fasilitas">
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Menu Fasilitas"
                className="bg-transparent text-black hover:bg-transparent hover:border-2 hover:border-primary hover:text-black min-w-8 duration-200 ease-linear"
              >
                <IconFridge />
                <span>Menu Fasilitas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>

          {/* bagian perabotan */}
          <Link href="/perabotan">
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Menu Perabotan"
                className="bg-transparent text-black hover:bg-transparent hover:border-2 hover:border-primary hover:text-black min-w-8 duration-200 ease-linear"
              >
                <IconArmchair />
                <span>Menu Perabotan</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>

        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
