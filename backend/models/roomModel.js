import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizeConnector.js";

class Room extends Model {}

Room.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    system_id: DataTypes.INTEGER,
  },
  { sequelize, modelName: "room" }
);

export default Room;
