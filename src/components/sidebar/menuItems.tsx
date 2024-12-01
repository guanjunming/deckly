import {
  IoLayersOutline,
  IoLayers,
  IoBarChartOutline,
  IoBarChart,
} from "react-icons/io5";
import { TbCards, TbCardsFilled } from "react-icons/tb";
import { FaRegFolderOpen, FaFolderOpen } from "react-icons/fa";
import { PiCrownLight, PiCrownFill } from "react-icons/pi";

export type MenuItemProps = {
  label: string;
  icon: React.ReactElement;
  iconActive: React.ReactElement;
  path: string;
};

export const menuItems: MenuItemProps[] = [
  {
    label: "Decks",
    icon: <IoLayersOutline />,
    iconActive: <IoLayers />,
    path: "/decks",
  },
  {
    label: "Add Cards",
    icon: <TbCards />,
    iconActive: <TbCardsFilled />,
    path: "/cards",
  },
  {
    label: "Browser",
    icon: <FaRegFolderOpen />,
    iconActive: <FaFolderOpen />,
    path: "/browser",
  },
  {
    label: "Statistics",
    icon: <IoBarChartOutline />,
    iconActive: <IoBarChart />,
    path: "/stats",
  },
  {
    label: "Premium",
    icon: <PiCrownLight />,
    iconActive: <PiCrownFill />,
    path: "/premium",
  },
];
