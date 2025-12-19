import { useState } from "react";
import { Sidebar } from "./ui/sidebar";

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
  
}