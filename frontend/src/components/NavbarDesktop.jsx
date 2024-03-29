import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faHouseLaptop} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "./NavbarDesktop.css";

const NavbarDesktop = () => {
  const { rooms } = useContext(RoomContext);
  const { isLoggedIn } = useContext(AuthContext);

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
    }
  };

  return (
    <div className="navbar-desktop">
      <h2 className="logo">Smart Home Mate</h2>
      <div className="navbar-main">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "navbar-link")}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <div className="navbar-main_item">
            <FontAwesomeIcon icon={faHome} />
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink
          to="/automations"
          className={({ isActive }) => (isActive ? "active" : "navbar-link")}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <div className="navbar-main_item">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <p>Automation</p>
          </div>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? "active" : "navbar-link")}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <div className="navbar-main_item">
            <FontAwesomeIcon icon={faCog} />
            <p>Settings</p>
          </div>
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) => (isActive ? "active" : "navbar-link")}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <div className="navbar-main_item">
            <FontAwesomeIcon icon={faHouseLaptop} />
            <p>Accessories</p>
          </div>
        </NavLink>
      </div>
      {isLoggedIn && (
        <>
          <div className="navbar-rooms-container">
            <h3>Rooms</h3>
            <div className="navbar-rooms">
              {rooms.map((room) => (
                <div key={room.id} className="navbar-room">
                  <NavLink
                    to={`/room/${room.id}`}
                    className={({ isActive }) =>
                      isActive ? "active" : "navbar-link"
                    }
                  >
                    <div className="navbar-room">
                      <FontAwesomeIcon icon={faArrowAltCircleRight} />
                      <p>{room.name}</p>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarDesktop;
