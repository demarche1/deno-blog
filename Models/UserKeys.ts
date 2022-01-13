import { Model, DataTypes } from "../deps.ts";
import User from "./User.ts";

export default class UserKeys extends Model {
  static table = "user_keys";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    key: DataTypes.STRING,
  };

  static user() {
    return this.hasOne(User);
  }
}
