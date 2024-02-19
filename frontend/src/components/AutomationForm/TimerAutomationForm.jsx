import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DaySelection from "./DaySelection";
import TimeSelection from "./TimeSelection";
import DeviceSelection from "./DeviceSelection";
import { DisableCheckbox } from "./DisableCheckbox";

import { dummyDevices } from "../../dummyData/dummyDevices";
import { dummyAutomations } from "../../dummyData/dummyAutomations";

import styles from "./CreateAutomation.module.css";

const TimerAutomationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [automation, setAutomation] = useState(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchAutomation = async () => {
      const foundAutomation = dummyAutomations.find(
        (automation) => automation.id == id
      );
      setAutomation(foundAutomation);
      setIsLoading(false);
    };
    if (id) {
      fetchAutomation();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const [time, setTime] = useState("");
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [selectedSensors, setSelectedSensors] = useState([]);

  useEffect(() => {
    if (automation) {
      setTime(automation.time);
      setSelectedDays(automation.weekdays);
      setSelectedSensors(automation.devices);
      setIsDisabled(automation.isDisabled);
    }
  }, [automation]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { selectedDays, time, selectedSensors, isDisabled };
    if (id) {
      console.log("Updating automation", id);
    } else {
      console.log("Creating new automation");
    }
    console.log(data);
    navigate("/automations");
  };

  const handleCheckboxChange = (event) => {
    if (automation) {
      setAutomation({
        ...automation,
        isDisabled: event.target.checked,
      });
    }
  };

  const isButtonDisabled = () => {
    const noDaysSelected = !Object.values(selectedDays).some(Boolean);
    const noSensorsSelected = selectedSensors.length === 0;
    return isLoading || !time || noDaysSelected || noSensorsSelected;
  };

  return (
    <div>
      <p>Time</p>
      <TimeSelection time={time} setTime={setTime} />
      <DaySelection
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
      <DeviceSelection
        devices={dummyDevices}
        selectedDevices={selectedSensors}
        setSelectedDevices={setSelectedSensors}
      />
      <DisableCheckbox
        automation={automation}
        isDisabled={automation?.isDisabled || false}
        handleCheckboxChange={handleCheckboxChange}
      />
      <button
        onClick={handleSubmit}
        disabled={isButtonDisabled()}
        style={
          isButtonDisabled() ? styles.disabledButtonStyles : styles.buttonStyles
        }
      >
        {isLoading
          ? "Loading..."
          : automation
          ? "Update Automation"
          : "Create New Automation"}
      </button>
    </div>
  );
};

export default TimerAutomationForm;
