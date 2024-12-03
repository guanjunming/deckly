import SideBarContent from "./SideBarContent";
import { auth } from "@/auth";
import logoImage from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import SidebarFooter from "./SidebarFooter";

const Sidebar = async () => {
  const session = await auth();

  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r p-2 lg:min-w-[275px]">
      <div className="flex h-16 items-center px-1 py-2">
        <Link href="/decks">
          <Image src={logoImage} alt="logo" width={48} height={48} priority />
        </Link>
      </div>

      <SideBarContent />

      <SidebarFooter session={session} />
    </aside>
  );
};

export default Sidebar;
