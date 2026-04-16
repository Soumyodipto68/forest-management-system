import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM("admin", "viewer"), defaultValue: "viewer" },
  otp: { type: DataTypes.STRING },
  otpExpiry: { type: DataTypes.DATE }
});

export default User;

