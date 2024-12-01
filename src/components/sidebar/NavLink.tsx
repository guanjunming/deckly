"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItemProps } from "./menuItems";

const NavLink = ({ menuItem }: { menuItem: MenuItemProps }) => {
  const pathname = usePathname();
  const isActive = pathname === menuItem.path;

  return (
    <Link href={menuItem.path} className="group flex py-1">
      <div className="flex items-center justify-center rounded-full p-3 transition duration-200 group-hover:bg-zinc-200">
        <div>{isActive ? menuItem.iconActive : menuItem.icon}</div>
        <div
          className={`${isActive && "font-bold"} ml-5 mr-4 hidden text-xl lg:block`}
        >
          {menuItem.label}
        </div>
      </div>
    </Link>
  );
};

export default NavLink;
