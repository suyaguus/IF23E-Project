"use client";

import Link from "next/link"; // 1. Import Link
import { Button } from "@/components/ui/button";
import { 
  IconMessage2, 
  IconBrandWhatsapp, 
} from "@tabler/icons-react";

export function QuickActions() {
  const actions = [
    { 
      label: "Ajukan Komplain", 
      icon: IconMessage2, 
      variant: "outline" as const,
      url: "/dashboard-user/laporan" 
    },
    { 
      label: "Hubungi Admin", 
      icon: IconBrandWhatsapp, 
      variant: "outline" as const,
      url: "https://wa.me/628123456789" // Contoh link WhatsApp
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        /* 3. Gunakan asChild agar Button bisa membungkus Link dengan benar */
        <Button key={action.label} variant={action.variant} className="gap-2 shadow-xs" asChild>
          <Link href={action.url}>
            <action.icon size={18} />
            {action.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}