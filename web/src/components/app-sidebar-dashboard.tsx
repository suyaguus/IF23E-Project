"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconBed } from "@tabler/icons-react";

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

export function AppSidebardashboard({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [currentUser, setCurrentUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    avatar: "",
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("user");

      if (storedUserString) {
        try {
          const storedUser = JSON.parse(storedUserString);

          setCurrentUser({
            name: storedUser.username || "User",
            email: storedUser.email || "No Email",
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
      <SidebarHeader className="h-12 border-b flex items-center px-4 justify-center lg:justify-start">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <IconBed className="size-4" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden">
            <span className="text-primary">Kos Wisma Dempo</span>
          </span>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  Kost Wisma Dempo
                </span>
              </a>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavGuest items={data.navGuest} /> */}
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
