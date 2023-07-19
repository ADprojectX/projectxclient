import React, { useState } from "react";
import "./css/Sidebar.css";
import { SidebarData } from "./data/SideBarData";
import SettingsIcon from '@mui/icons-material/Settings';

const SideNavBar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const menuItems = SidebarData
	return (
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="icons/Logo.svg" alt="" srcset="" />
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className="nav-menu">
					{menuItems.map(({ text, icon, link }) => (
						<a
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							href={link}
						>
                            <div className="menu-item-icon">
                                {icon}
                            </div>
							{/* <img className="menu-item-icon" src={icon} alt="" srcset="" /> */}
							{isExpanded && <p className='menu-item-text'>{text}</p>}
                            {!isExpanded && <div className="tooltip">{text}</div>}
						</a>
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt=""
							srcset=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">XYZ</p>
							<p className="nav-footer-user-position">store admin</p>
						</div>
					</div>
				)}

				{/* <img className="logout-icon" src="icons/logout.svg" alt="" srcset="" /> */}
			</div>
		</div>
	);
};

export default SideNavBar;



// import React, { useState } from "react";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { SidebarData } from "./data/SideBarData";
// import { IconContext } from "react-icons";
// import {SideBarCss} from './css/Sidebar.css'

// function SideBar() {
//   const [sidebar, setSidebar] = useState(false);

//   const showSidebar = () => setSidebar(!sidebar);

//   return (
//     <>
//       <IconContext.Provider value={{ color: "undefined" }}>
//         <div className="sidebar">
//           <Link to="#" className="menu-bars">
//             <FaIcons.FaBars onClick={showSidebar} />
//           </Link>
//         </div>
//         <nav className={sidebar ? "side-menu active" : "side-menu"}>
//           <ul className="sidebar-menu-items" onClick={showSidebar}>
//             <li className="sidebar-toggle">
//               <Link to="#" className="menu-bars">
//                 <AiIcons.AiOutlineClose />
//               </Link>
//             </li>
//             {SidebarData.map((item, index) => {
//               return (
//                 <li key={index} className={item.cName}>
//                   <Link to={item.path}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </IconContext.Provider>
//     </>
//   );
// }

// export default SideBar;


// import React from "react";
// import {SidebarCss} from './css/Sidebar.css'
// import {SideBarData} from './data/SideBarData'

// function SideBar() {
//     return (
//         <div className="sidebar">
//             <ul className="sidebarList">
//                 {SideBarData.map((key, val) => {
//                     return (
//                         <li
//                             key = {key}
//                             className="row"
//                             id = {window.location.pathname == val.link ? "active" : ""}
//                             onClick={() => {
//                                 window.location.pathname = val.link;
//                             }}
//                         >
//                             <div id='icon'>{val.icon}</div>
//                             <div id='title'>{val.title}</div>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </div>
//     )
// }

// export default SideBar;