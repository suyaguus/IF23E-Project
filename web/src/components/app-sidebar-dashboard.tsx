"use client";

import * as React from "react";
import { useEffect, useState } from "react"; // 1. Import Hooks
import {
  IconInnerShadowTop,
  // ... icon lainnya
} from "@tabler/icons-react";

import { NavUser } from "@/components/nav-user";
import { NavGuest } from "@/components/nav-guest";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  navGuest: [],
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

export function AppSidebardashboard({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Buat State untuk User dengan Default "Guest"
  const [currentUser, setCurrentUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    avatar: "", // Kosongkan atau isi path gambar default
  });

  const [isMounted, setIsMounted] = useState(false);


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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGuest items={data.navGuest} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
          <NavUser user={currentUser} />{" "}
          {/* {isMounted && <NavUser user={currentUser} />} */}
      </SidebarFooter>
    </Sidebar>
  );
}
