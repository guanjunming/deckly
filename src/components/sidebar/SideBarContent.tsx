"use client";

import NavLink from "./NavLink";
import { IconContext } from "react-icons";
import { menuItems } from "./menu-items";

const SideBarContent = () => {
  return (
    <IconContext.Provider value={{ size: "1.75rem" }}>
      <nav className="flex flex-grow flex-col overflow-auto">
        {menuItems.map((item, index) => (
          <NavLink key={index} menuItem={item} />
        ))}
      </nav>
    </IconContext.Provider>
  );
};

export default SideBarContent;
