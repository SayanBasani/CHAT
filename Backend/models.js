import sequelize from "./DB.js";
import { DataTypes } from "sequelize";
// {user_name: '46', user_email: '44646@g', user_ph_no: '44', user_password: '6464'}

export const User = sequelize.define("User", {
  uid:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_name : {
    type : DataTypes.STRING,
    allowNull : false,
  },
  user_email : {
    type : DataTypes.STRING,
    allowNull : false,
    unique : true
  },
  user_ph_no : {
    type : DataTypes.STRING,
    allowNull : false,
  },
  user_password : {
    type : DataTypes.STRING,
    allowNull : false,
  }
});
