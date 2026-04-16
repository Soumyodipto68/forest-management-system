import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Biosphere = sequelize.define("Biosphere", {
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  area: { type: DataTypes.FLOAT }, // in sq km
  description: { type: DataTypes.TEXT }
});

export default Biosphere;
