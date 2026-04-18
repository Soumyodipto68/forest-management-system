import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const News = sequelize.define("News", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false }
});

export default News;
