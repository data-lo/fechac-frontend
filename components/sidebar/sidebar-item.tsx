'use client'

import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


interface SidebarItemProps {
    icon: React.ComponentType<LucideProps>;
    label: string;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    href
}) => {

    const pathname = usePathname();
    const router = useRouter();

    const isActive =
        pathname === href ||
        pathname.startsWith(`${href}`);

    const onClick = () => {
        router.push(`${href}/view`);
    };

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "rounded-md flex items-center gap-x-2 text-slate-500 text-sm font-[500] transition-all ",
                isActive && "text-white bg-black "
            )}
        >
            <div className="flex items-center hover:bg-gray-200 p-3 rounded-md">
                <Icon
                    size={22}
                    className={cn("text-slate-500", isActive && "text-white-500")}
                />
            </div>
        </button>
    )
}

export default SidebarItem;