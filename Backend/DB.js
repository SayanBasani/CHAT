import e from "express";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('chat', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error("error is --->",error);
}
export default sequelize;
