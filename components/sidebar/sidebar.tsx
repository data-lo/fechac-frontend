"use client"

import { routes } from "@/routes/routes";
import SidebarItem from "./sidebar-item";

const Sidebar = () => {

    return (
        <aside className={`flex w-20 min-w-[5rem] transition-all duration-300 ease-in-out overflow-hidden`}>
            <div className="h-full border-r-2 flex flex-col border-gray-200 bg-white w-full">
                    <div className="flex flex-col w-full gap-2 items-center mt-6">
                        {routes.map((route, index) => (
                            <SidebarItem
                                key={index}
                                icon={route.icon}
                                label={route.label}
                                href={route.href}
                            />
                        ))}
                    </div>
                </div>

        </aside>
    )
}

export default Sidebar;