import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarData = [
    {
        text: "Dashboard",
        icon: <HomeIcon />,
        link: "/dashboard",
    },
    {
        text: "Profile",
        icon: <AccountBoxIcon />,
        link: "/dashboard",
    },
    {
        text: "Settings",
        icon: <SettingsIcon/>,
        link: "/dashboard",
    },
];
// export const SidebarData = [
//   {
//     title: "Home",
//     path: "/",
//     icon: <AiIcons.AiFillHome />,
//     cName: "sidebar-text",
//   },
//   {
//     title: "Reports",
//     path: "/reports",
//     icon: <IoIcons.IoIosPaper />,
//     cName: "sidebar-text",
//   },
//   {
//     title: "Products",
//     path: "/products",
//     icon: <FaIcons.FaCartPlus />,
//     cName: "sidebar-text",
//   },
//   {
//     title: "Team",
//     path: "/team",
//     icon: <IoIcons.IoMdPeople />,
//     cName: "sidebar-text",
//   },
//   {
//     title: "Messages",
//     path: "/messages",
//     icon: <FaIcons.FaEnvelopeOpenText />,
//     cName: "sidebar-text",
//   },
//   {
//     title: "Support",
//     path: "/support",
//     icon: <IoIcons.IoMdHelpCircle />,
//     cName: "sidebar-text",
//   },
// ];


