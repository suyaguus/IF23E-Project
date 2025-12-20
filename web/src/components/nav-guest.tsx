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
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export function NavGuest({
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
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton
                            tooltip="Menu Sidebar"
                            className="bg-transparent text-black hover:bg-transparent hover:text-black min-w-8 duration-200 ease-linear"
                        >
                            <IconMenu />
                            <span>Menu Sidebar</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

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
