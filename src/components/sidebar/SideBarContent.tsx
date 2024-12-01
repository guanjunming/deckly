"use client";

import NavLink from "./NavLink";
import { IconContext } from "react-icons";
import { menuItems } from "./menuItems";

const SideBarContent = () => {
  return (
    <IconContext.Provider value={{ size: "1.75rem" }}>
      <nav className="flex flex-1 flex-col items-center overflow-auto lg:items-start">
        {menuItems.map((item, index) => (
          <NavLink key={index} menuItem={item} />
        ))}
      </nav>
    </IconContext.Provider>
  );
};

export default SideBarContent;
