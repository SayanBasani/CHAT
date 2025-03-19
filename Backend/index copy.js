// {"user_name": '46', "user_email": '44646@g', "user_ph_no": '44', "user_password": '6464'}
// {user_name: '46', user_email: '44646@g', user_ph_no: '44', user_password: '6464'}

import express from 'express';
import mysql from 'mysql2';
import Sequelize, { DataTypes }  from 'sequelize';

// var conn = mysql.createPool({
//   host     : '127.0.0.1',
//   port     : '3306',
//   user     : 'root',
//   password : 'admin',
//   database : 'chat' 
// });

// conn.getConnection(function(err,conn) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + conn.threadId);
// });


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

const user_model = sequelize.define(
  'user',{
    user_name:{
      type : DataTypes.STRING,
      allowNull : false
    },
    user_email:{
      type : DataTypes.STRING,
      allowNull : false
    },
    user_ph_no:{
      type : DataTypes.NUMBER,
      allowNull : false
    },
    user_password:{
      type : DataTypes.STRING,
      allowNull : false
    }
  }
)
console.log(user_model === sequelize.models.user);

const app = express();
app.use(express.json());
const port = 3000;
app.post('/',(req,res)=>{
  // console.log(req.body);
  const { user_name,user_email,user_ph_no,user_password } = req.body;
  console.log(`Name: ${user_name} Email: ${user_email} Phone: ${user_ph_no} Password: ${user_password}`);
  
  res.send(`Hello World --> ${req.ip}`);
})









app.listen(port,()=>{
  console.log('Server is running on port 3000');
})