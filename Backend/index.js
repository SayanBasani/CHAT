import express from "express";
import { Sequelize,DataTypes, json } from "sequelize";
import sequelize from "./DB.js";
import { User } from "./models.js";
import cors from "cors";
import cookieParser from "cookie-parser";

(async () => {
  console.log("try to 1");
  await sequelize.sync({ alter: true});
  try {
    await sequelize.sync({ alter: true});
    console.log("User table synced successfully");
  } catch (error) {
    console.error("Error in syncing User table");
    console.log(error);
    
  }
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const port = 3001;

app.get('/',async(req , res)=>{
  const allUser = await User.findAll();
  console.log(allUser);
  
  res.send(allUser);
})
app.post('/create/',async(req,res)=>{
  console.log(req.body);
  console.log("-------------------");
  try {
    const user = await User.create(req.body);
    console.log("...............");
    res.send({
      "accout":{
        "user_email":user.user_email,
        "user_ph_no":user.user_ph_no
      },
      "user_email":user.user_email,"user_ph_no":user.user_ph_no
    });
    console.log("...............!");
  } catch (error) {
    console.log(error.errors[0].message)
    res.send({
      'error message':error.errors[0].message,
      // 'error':error
    });
  }
});
app.post('/loginUser/',async(req,res)=>{
  console.log(req.body);
  const { user_email, user_password } = req.body;
  if (!user_email || !user_password) {
    return res.status(400).json({ error: "Email and password are required!" });
  }
  try {
    const user = await User.findOne({ where: { user_email, user_password } });

    if (user) {
      res.cookie("user",user)
      res.json({ 
        message: "Login successful!",
        "login":true, 
        "user_email" : user.user_email,
        "user_ph_no":user.user_ph_no,
        'user':{
          "user_email" : user.user_email,
          "user_ph_no":user.user_ph_no,
        }
      });
    } else {
      res.status(401).json({ error: "Invalid email or password!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})
app.post('/deleteUser/',async(req , res)=>{
  console.log('--------------------');
  const { user_email,user_ph_no } = req.body;
  // console.log(uid);
  try {
    const delete_user = await User.destroy({
      where: {
        user_email : `${user_email}`,
        user_ph_no : `${user_ph_no}`
      }
    });
    console.log(delete_user);
    res.send("User is deleted");
  } catch (error) {
    console.log(error);
    res.send("User is not deleted!");
  }
  
});
app.listen(port , ()=>{
  console.log(`server is on port ${port}`);
});


