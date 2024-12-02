"use client";

import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import { logout } from "@/actions/auth";
import Link from "next/link";

interface DropdownMenuProps {
  session: Session | null;
}

const SidebarFooter = ({ session }: DropdownMenuProps) => {
  const user = session?.user;

  return (
    <div className="flex w-full items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-3 overflow-hidden rounded-full p-3 hover:bg-zinc-200">
            <Avatar className="flex-shrink-0">
              <AvatarImage
                src={user?.image || undefined}
                alt={user?.name || undefined}
              />
              <AvatarFallback className="uppercase">
                {user?.name ? user.name[0] : undefined}
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-1 flex-col overflow-hidden text-left lg:flex">
              <div className="font-bold">{user?.name || "Unknown"}</div>
              <div className="text-sm text-muted-foreground">
                {user?.email || "unknown"}
              </div>
            </div>
            <div className="hidden flex-shrink-0 lg:block">
              <Ellipsis size={18} />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuItem asChild className="cursor-pointer text-base">
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-base"
            onClick={() => logout()}
          >
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SidebarFooter;
