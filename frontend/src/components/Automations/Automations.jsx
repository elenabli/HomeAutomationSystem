import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAutomations } from "../../services/automationServices";

import { TimerAutomationCard } from "./TimerAutomationCard";
import { SensorAutomationCard } from "./SensorAutomationCard";

import styles from "./Automation.module.css";

export const Automations = () => {
  const [automations, setAutomations] = useState([]);

  useEffect(() => {
    const fetchAutomations = async () => {
      try {
        const data = await getAutomations();
        setAutomations(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAutomations();
  }, []);

  return (
    <div
      className={styles.automationContainer}
      data-testid="automation-container"
    >
      {automations.map((automation) =>
        automation.type === "timer" ? (
          <div
            key={automation.id}
            data-testid={`timer-automation-${automation.id}`}
          >
            <TimerAutomationCard automation={automation} />
          </div>
        ) : (
          <div
            key={automation.id}
            data-testid={`sensor-automation-${automation.id}`}
          >
            <SensorAutomationCard automation={automation} />
          </div>
        )
      )}
      <Link to="/automations/new" data-testid="create-automation-button">
        <button>Create New Automation</button>
      </Link>
    </div>
  );
};
