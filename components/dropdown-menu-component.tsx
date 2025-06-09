import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface Props {
    children: React.ReactNode;
}

const DropdownMenuComponent: React.FC<Props> = ({ children }) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="hover:bg-gray-300 p-1 rounded-md">
                <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="gap-2 flex flex-col">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownMenuComponent;