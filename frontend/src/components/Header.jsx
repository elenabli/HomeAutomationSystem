import { useState, useRef, useEffect } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faTimes,
  faLightbulb,
  faTachometerAlt,
  faArrowCircleRight,
  faUser,
  faSignIn,
  faSignOut,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const isLoggedIn = false;

const menuItems = [
  { icon: faLightbulb, text: "Add accessory", onClick: () => {} },
  { icon: faTachometerAlt, text: "Add automation", path: "/automations/new" },
  { icon: faArrowCircleRight, text: "Add room", onClick: () => {} },
  { icon: faUser, text: "Add users", onClick: () => {} },
  isLoggedIn
    ? { icon: faSignOut, text: "Log out", path: "/logout" }
    : { icon: faSignIn, text: "Log in", path: "/login" },
  { icon: faAddressBook, text: "Register", path: "/register" },
];

const MenuItem = ({ icon, text, path }) => {
  return (
    <div className="menu-item">
      <FontAwesomeIcon icon={icon} />
      {path ? (
        <NavLink to={path} className="hover-underline-animation">
          {text}
        </NavLink>
      ) : (
        <span className="hover-underline-animation">{text}</span>
      )}
    </div>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef();

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="header" ref={node}>
      <NavLink to="/" className="header-item home-icon">
        <FontAwesomeIcon icon={faHome} className="header-icon" />
      </NavLink>
      <div className="header-item">
        <div className="plus-icon" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faPlus}
            className="header-icon"
          />
        </div>
        <div className={`overflow-menu ${isOpen ? "show" : ""}`}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
