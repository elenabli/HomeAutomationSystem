const Sequelize = require("sequelize");
const TimeAutomation = require("../models/timeAutomationModel.js");
const Device = require("../models/deviceModel.js");
const UsageHistory = require("../models/usageHistoryModel.js");
const { Op } = require("sequelize");
const events = require("events");
const eventEmitter = new events.EventEmitter();

const checkAutomations = async () => {
  const now = new Date();

  const currentDayIndex = now.getDay() || 7;
  const currentDayBit = 1 << (currentDayIndex - 1);
  const currentHours = now.getHours().toString().padStart(2, "0");
  const currentMinutes = now.getMinutes().toString().padStart(2, "0");
  const currentTime = `${currentHours}:${currentMinutes}`;

  console.log(`Checking automations on a ${currentDayIndex} at ${currentTime}`);

  const automations = await TimeAutomation.findAll({
    where: {
      time: currentTime,
      disabled: false,
      [Op.and]: [Sequelize.literal(`weekdays & ${currentDayBit} != 0`)],
    },
    include: {
      model: Device,
      attributes: ["id", "system_id"],
      through: { attributes: [] },
    },
  });

  console.log(automations);

  automations.forEach((automation) => {
    automation.devices.forEach(async (device) => {
      try {
        await Device.update(
          { value: automation.action },
          { where: { id: device.id } }
        );
        const updatedDevice = await Device.findByPk(device.id);
        await UsageHistory.create({
          device_id: updatedDevice.id,
          user_id: 1,
          sensor_value: automation.action,
          data_type: updatedDevice.data_type,
          timestamp: new Date(),
        });
        eventEmitter.emit("devicesUpdated", device.system_id);
      } catch (error) {
        console.error(`Failed to update device ${device.id}: ${error}`);
      }
    });
  });
};

module.exports = { checkAutomations, eventEmitter };
