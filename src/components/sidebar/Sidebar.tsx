import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SideBarContent from "./SideBarContent";
import { auth } from "@/auth";
import { Ellipsis } from "lucide-react";
import logoImage from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Sidebar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r p-2 lg:min-w-[275px]">
      <div className="flex h-16 items-center p-2">
        <Link href="/decks">
          <Image src={logoImage} alt="logo" width={48} height={48} priority />
        </Link>
      </div>

      <SideBarContent />

      <div className="flex w-full items-center gap-2">
        <button className="flex w-full items-center gap-3 overflow-hidden rounded-full p-3 hover:bg-zinc-200">
          <Avatar className="flex-shrink-0">
            <AvatarImage src={user?.image ? user.image : ""} />
            <AvatarFallback className="uppercase">
              {user?.name ? user.name[0] : ""}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-1 flex-col overflow-hidden text-left lg:flex">
            <div className="font-bold">{user ? user.name : "Unknown"}</div>
            <div className="text-sm text-muted-foreground">
              {user ? user.email : "Unknown"}
            </div>
          </div>
          <div className="hidden flex-shrink-0 lg:block">
            <Ellipsis size={18.75} />
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
