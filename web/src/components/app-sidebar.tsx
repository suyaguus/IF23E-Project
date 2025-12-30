"use client";

import * as React from "react";
import { useEffect, useState } from "react"; // 1. Import Hooks
import {
  IconBed,
  IconInnerShadowTop,
  // ... icon lainnya
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
const data = {
  user: {
    // name: "Suyaguus",
    // email: "suyaguus@gmail.com",
    // avatar: "/images/suyaguus.jpeg",
  },
  navMain: [
    // {
    //   title: "User",
    //   url: "/user",
    //   icon: IconDashboard,
    // },
    // {
    //   title: "Kamar",
    //   url: "#",
    //   icon: IconListDetails,
    // },
    // {
    //   title: "Perabotan",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    // {
    //   title: "Fasilitas",
    //   url: "#",
    //   icon: IconFolder,
    // },
    // {
    //   title: "Order",
    //   url: "#",
    //   icon: IconUsers,
    // },
    // {
    //   title: "Riwayat Pembayaran",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: IconCamera,
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Proposal",
  //     icon: IconFileDescription,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Prompts",
  //     icon: IconFileAi,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: IconReport,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: IconFileWord,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Buat State untuk User dengan Default "Guest"
  const [currentUser, setCurrentUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    avatar: "", // Kosongkan atau isi path gambar default
  });

  useEffect(() => {
    // Pastikan kode hanya jalan di client
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("user");

      if (storedUserString) {
        try {
          const storedUser = JSON.parse(storedUserString);

          // 2. Update State (Sertakan avatar juga)
          setCurrentUser({
            name: storedUser.username || "User",
            email: storedUser.email || "No Email",
            // Gunakan avatar kosong atau default image jika tidak ada
            avatar: "",
          });
        } catch (error) {
          console.error("Gagal parsing user data:", error);
        }
      }
    }
  }, []);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
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
        <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>

        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />{" "}
      </SidebarFooter>
    </Sidebar>
  );
}
