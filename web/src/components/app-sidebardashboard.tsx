import { useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { IconInnerShadowTop } from "@tabler/icons-react"
import { NavGuest } from "./nav-guest";






const data = {
    user: {

    },
    navGuest: [],
};

export function AppSidebardashboard({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
    </Sidebar>
  );
  
}