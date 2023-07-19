import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarData = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        links: ["/dashboard", "/title", "/script", "/voice"],
    },
    {
        text: "Profile",
        icon: <AccountBoxIcon />,
        links: ["/"],
    },
    {
        text: "Settings",
        icon: <SettingsIcon/>,
        links: ["/"],
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


