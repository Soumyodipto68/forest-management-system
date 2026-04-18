import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Safari = sequelize.define("Safari", {
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT }
});

export default Safari;
