import SideBarContent from "./SideBarContent";
import { auth } from "@/auth";
import Link from "next/link";
import SidebarFooter from "./SidebarFooter";
import AppLogo from "../common/AppLogo";

const Sidebar = async () => {
  const session = await auth();

  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r p-2 lg:min-w-[275px]">
      <div className="flex h-16 items-center px-1 py-2">
        <Link href="/decks">
          <AppLogo size={48} />
        </Link>
      </div>

      <SideBarContent />

      <SidebarFooter session={session} />
    </aside>
  );
};

export default Sidebar;
