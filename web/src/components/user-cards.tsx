// src/components/user-cards.tsx
"use client";

import { IconHome, IconReceipt2, IconCalendarStats, IconMessageReport, Icon } from "@tabler/icons-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; // Pastikan sudah install shadcn progress
import { VariantProps } from "class-variance-authority";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

interface StatItem {
  title: string;
  value: string;
  description: string;
  icon: Icon;
  status: string;
  badgeVariant: BadgeVariant;
  progress?: number; // Tambahkan opsional progress
}

export function UserStatsCards() {
  const stats: StatItem[] = [
    {
      title: "Kamar Saya",
      value: "A-102",
      description: "Lantai 1 - Tipe Deluxe",
      icon: IconHome,
      status: "Aktif",
      badgeVariant: "default",
    },
    {
      title: "Tagihan Bulan Ini",
      value: "Rp 1.500.000",
      description: "Jatuh tempo: 5 Feb 2025",
      icon: IconReceipt2,
      status: "Belum Bayar",
      badgeVariant: "destructive",
    },
    {
      title: "Sisa Sewa",
      value: "14 Hari",
      description: "Berakhir: 15 Feb 2025",
      icon: IconCalendarStats,
      status: "Perlu Perpanjang",
      badgeVariant: "secondary",
      progress: 45, // Contoh: sisa 14 dari 30 hari
    },
    {
      title: "Komplain Aktif",
      value: "1",
      description: "Perbaikan AC sedang diproses",
      icon: IconMessageReport,
      status: "Diproses",
      badgeVariant: "outline",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((item, index) => (
        <Card key={index} className="@container/card shadow-sm border-border/60 overflow-hidden">
          <CardHeader>
            <CardDescription>{item.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold">{item.value}</CardTitle>
            <CardAction>
              <Badge variant={item.badgeVariant} className="text-[10px]">{item.status}</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <item.icon size={16} className="text-primary" />
               {item.description}
            </div>
            {/* Tampilkan Progress Bar jika ada data progress */}
            {item.progress !== undefined && (
              <div className="w-full space-y-1">
                <Progress value={item.progress} className="h-1.5" />
                <p className="text-[10px] text-right text-muted-foreground">{item.progress}% Terlewati</p>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}