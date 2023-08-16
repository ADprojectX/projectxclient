import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import "./css/Sidebar.css";
import { SidebarData } from "./data/SideBarData";
import { useLocation } from "react-router-dom";
import { userLogout } from '../auth/userLogout'


const SideNavBar = () => {
	const [isExpanded, setExpendState] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const navigate = useNavigate()
	const menuItems = SidebarData
    const location = useLocation();
	const { error, logout } = userLogout();


    const API_BASE_URL = 'http://localhost:8000/api';

    const isMenuItemActive = (links) => {
        return links.some((link) => location.pathname === link);
      };


	  const handleLogout = async () => {
		  try {
			  await logout();
			  // Clear cookies if you still need this.
			  Cookies.remove('jwt', { domain: 'localhost', path: '/', secure: true });
			  Cookies.remove('csrftoken', { domain: 'localhost', path: '/', secure: true });
			  console.log('logout_successful');
			  navigate('/login');
		  } catch (err) {
			  setErrorMessage('Cannot logout');
			  console.log(errorMessage);
		  }
	  };

    const handleLogoutClick = () => {
        let data = { token: Cookies.get('jwt') };
        axios.post(`${API_BASE_URL}/logout/`, data, { withCredentials: true })
        .then((response) => {
            Cookies.remove('jwt', { domain: 'localhost', path: '/', secure: true });
            Cookies.remove('csrftoken', { domain: 'localhost', path: '/', secure: true });
            console.log('logout_successful');
            navigate('/login');
        })
        .catch((error) => {
            setErrorMessage('cannot logout');
            console.log(errorMessage);
        });
    };

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
					{menuItems.map(({ text, icon, links }) => (
						// <a
						// 	className={isExpanded ? `menu-item ${isMenuItemActive(links) ? "active" : ""}` : `menu-item menu-item-NX ${isMenuItemActive(links) ? "active" : ""}`}
						// 	href={links[0]}
						// >
                        //     <div className="menu-item-icon">
                        //         {icon}
                        //     </div>
						// 	{/* <img className="menu-item-icon" src={icon} alt="" srcset="" /> */}
						// 	{isExpanded && <p className='menu-item-text'>{text}</p>}
                        //     {!isExpanded && <div className="tooltip">{text}</div>}
						// </a>
                        <button
                        className={
                          isExpanded
                            ? `menu-item ${isMenuItemActive(links) ? "active" : ""}`
                            : `menu-item menu-item-NX ${isMenuItemActive(links) ? "active" : ""}`
                        }
                        onClick={() => window.location.href = links[0]}
                      >
                        <div className="menu-item-icon">
                          {icon}
                        </div>
                        {isExpanded && <p className='menu-item-text'>{text}</p>}
                        {!isExpanded && <div className="tooltip">{text}</div>}
                      </button>
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
                        <button className={isExpanded ? `logout-item` : "logout-item logout-item-NX"} onClick={handleLogout}>Log out</button>
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