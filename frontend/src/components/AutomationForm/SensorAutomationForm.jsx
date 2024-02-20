import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DeviceSelection from "./DeviceSelection";

import { dummySensors } from "../../dummyData/dummySensors";
import { dummyDevices } from "../../dummyData/dummyDevices";
import { dummyAutomations } from "../../dummyData/dummyAutomations";

import styles from "./CreateAutomation.module.css";

const SensorAutomationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [automation, setAutomation] = useState(null);
  const [isLoading, setIsLoading] = useState(!!id);

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

  const [selectedSensorId, setSelectedSensorId] = useState("");
  const [value, setValue] = useState(0);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (automation) {
      setSelectedSensorId(automation.sensor[0].id);
      setValue(automation.sensorValue);
      setSelectedDevices(automation.devices);
      setAction(
        automation.actionType.toLowerCase() === "Turn on"
          ? "Turn on"
          : "Turn off"
      );
    }
  }, [automation]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedSensor = dummySensors.find(
      (sensor) => sensor.id === selectedSensorId
    );
    const data = { selectedSensor, value, selectedDevices, action };
    if (id) {
      console.log("Updating automation", id);
    } else {
      console.log("Creating new automation");
    }
    console.log(data);
    navigate("/automations");
  };

  const isButtonDisabled = () => {
    const noSensorSelected = !selectedSensorId;
    const noDevicesSelected = selectedDevices.length === 0;
    const noActionSelected = !action;
    return (
      isLoading || noSensorSelected || noDevicesSelected || noActionSelected
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sensor:
        <select
          value={selectedSensorId} // Changed from selectedSensor to selectedSensorId
          onChange={(e) => setSelectedSensorId(e.target.value)} // Changed from setSelectedSensor to setSelectedSensorId
        >
          <option value="">Select a sensor</option>
          {dummySensors.map((sensor) => (
            <option key={sensor.id} value={sensor.id}>
              {sensor.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Value:
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value}
      </label>

      <DeviceSelection
        devices={dummyDevices}
        selectedDevices={selectedDevices}
        setSelectedDevices={setSelectedDevices}
      />

      <label>
        Action:
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="">Select an action</option>
          <option value="Turn on">Turn on</option>
          <option value="Turn off">Turn off</option>
        </select>
      </label>

      <button type="submit" disabled={isButtonDisabled()}>
        {isLoading
          ? "Loading..."
          : automation
          ? "Update Automation"
          : "Create New Automation"}
      </button>
    </form>
  );
};

export default SensorAutomationForm;