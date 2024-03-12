import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TestCard.css";

const TestCard = ({ title, icon, status, onClick }) => {
  const iconClass = status === "on" ? "icon-on" : "icon-off";

  return (
    <div className="card" onClick={onClick}>
      <div className="card-body">
        <FontAwesomeIcon icon={icon} size="2x" className={iconClass} />
        <div className="card-column">
          <p>{title}</p>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
