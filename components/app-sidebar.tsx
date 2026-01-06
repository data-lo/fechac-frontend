"use client"

import { CircleSlash, FileStack, Target, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { routes } from "@/routes/routes";

import { usePathname } from "next/navigation";

export function AppSidebar() {

    const pathname = usePathname();

    return( 
        <Sidebar variant="sidebar">
            <SidebarContent>
                <h3 className="px-4 mt-4 font-bold">Integración Digital</h3>
                <SidebarGroup>
                    <SidebarGroupLabel>Menú</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {routes.map((item) => {

                                const isActive = pathname === item.url

                                return (
                                    <SidebarMenuItem key={item.title} >
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <a
                                                href={item.url}
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}