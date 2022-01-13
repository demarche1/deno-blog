import { Model, DataTypes } from "../deps.ts";
import UserKeys from "./UserKeys.ts";

export default class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      length: 60,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      length: 25,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 80,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      length: 180,
    },
  };

  static keys() {
    return this.hasMany(UserKeys);
  }
}
