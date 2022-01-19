import { Model, DataTypes } from "../deps.ts";

export default class ApiToken extends Model {
  static table = "api_tokens";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    jwt: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      length: 60,
      unique: true,
      allowNull: false,
    },
  };
}
