import sequelize from "./DB.js";
import { DataTypes } from "sequelize";
// {user_name: '46', user_email: '44646@g', user_ph_no: '44', user_password: '6464'}

export const User = sequelize.define("User", {
  uid:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
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

export const Message = sequelize.define("Message",{
  uid:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  sender_id:{
    type:DataTypes.STRING,
    allowNull:false
  },
  receiver_id:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  send_time:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  receive_time:{
    type:DataTypes.STRING,
  },
  seen_time:{
    type:DataTypes.STRING,
  },
  message:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  is_read:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  deleted:{
    type:DataTypes.BOOLEAN,
    defaultValue:false,
  }
})

export const Contact = sequelize.define("Contact",{
  uid:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  user_id:{
    type:DataTypes.STRING,
    allowNull:true,
  },
  ContactName:{
    type:DataTypes.STRING,
  },
  phoneNumber:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  ContactEmail:{
    type:DataTypes.STRING
  }
})