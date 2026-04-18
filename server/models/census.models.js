import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Census = sequelize.define("Census", {
  animal: { type: DataTypes.STRING, allowNull: false },
  count: { type: DataTypes.INTEGER, allowNull: false }
});

export default Census;
