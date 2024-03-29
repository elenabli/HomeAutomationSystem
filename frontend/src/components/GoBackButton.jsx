import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./GoBackButton.css";

function GoBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <div
      onClick={() => navigate(-1)}
      className="go-back-button"
      data-testid="go-back-button-test"
    >
      <FontAwesomeIcon icon={faArrowCircleLeft} className="go-back-icon" />
    </div>
  );
}

export default GoBackButton;
