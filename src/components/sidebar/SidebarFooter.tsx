"use client";

import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis, LogOut, Settings } from "lucide-react";
import { logout } from "@/server/actions/auth";
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
            <Avatar>
              <AvatarImage
                src={user?.image || undefined}
                alt={user?.name || undefined}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback className="uppercase">
                {user?.name ? user.name[0] : undefined}
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-1 flex-col overflow-hidden text-left leading-tight lg:flex">
              <div className="font-bold">{user?.name || "Unknown"}</div>
              <div className="text-sm text-muted-foreground">
                {user?.email || "unknown"}
              </div>
            </div>
            <div className="hidden flex-shrink-0 lg:block">
              <Ellipsis size={20} />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-60 rounded-xl p-2"
          alignOffset={10}
          align="start"
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={user?.image || undefined}
                  alt={user?.name || undefined}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="uppercase">
                  {user?.name ? user.name[0] : undefined}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col overflow-hidden text-left leading-none">
                <span className="font-semibold">{user?.name || "Unknown"}</span>
                <span className="text-xs">{user?.email || "unknown"}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              asChild
              className="cursor-pointer px-1.5 text-base"
            >
              <Link href="/settings">
                <div className="flex w-full items-center gap-2">
                  <Settings className="h-5 w-5" /> Settings
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer px-1.5 text-base"
              onClick={() => logout()}
            >
              <div className="flex w-full items-center gap-2">
                <LogOut className="h-5 w-5" /> Log out
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SidebarFooter;
