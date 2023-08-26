import "./css/Sidebar.css";
import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
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

    const isMenuItemActive = (links) => {
        return links.some((link) => location.pathname === link);
      };

	  const handleLogout = async () => {
		  try {
			  await logout();
			  Cookies.remove('jwt', { domain: 'localhost', path: '/', secure: true });
			  Cookies.remove('csrftoken', { domain: 'localhost', path: '/', secure: true });
			  navigate('/login');
		  } catch (err) {
			  setErrorMessage('Cannot logout');
			  console.log(errorMessage);
		  }
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
							<img src="" alt="" />
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
                        <button
						key={links}
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
							{/* <p className="nav-footer-user-name">XYZ</p> */}
							{/* <p className="nav-footer-user-position">store admin</p> */}
						</div>
					</div>
				)}

			</div>
		</div>
	);
};

export default SideNavBar;