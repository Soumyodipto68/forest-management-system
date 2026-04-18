import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Park = sequelize.define("Park", {
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT }
});

export default Park;
