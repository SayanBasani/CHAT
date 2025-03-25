import express from "express";
import { Sequelize, DataTypes, json } from "sequelize";
import sequelize from "./DB.js";
import { User, Message, Contact } from "./models.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { InitializeSocket } from "./sockets.js";
import { checkIsUser, checkUserIsLoginANDValid } from "./middleware.js";
import FORNTEND_BASE_URL from "./config.js";

async () => {
  console.log("try to 1");
  try {
    await sequelize.sync({ alter: true });
    console.log("User table synced successfully");
  } catch (error) {
    console.error("Error in syncing User table");
    console.log(error);
  }
};

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: FORNTEND_BASE_URL,
    credentials: true,
  })
);
app.use(cookieParser());
const port = 3001;
app.use(
  ["/addContect", "/logOutUser/", "/getAllContect/", "/getUserData/"],
  checkUserIsLoginANDValid
);
app.use(["/getUserData/"], checkIsUser);
const server = http.createServer(app);
InitializeSocket(server);

async () => {
  let m = {
    sender_id: "user1@example.com",
    receiver_id: "user2@example.com",
    send_time: "2025-03-22T10:30:00Z",
    receive_time: "2025-03-22T10:31:00Z",
    seen_time: "2025-03-22T10:32:00Z",
    message: "Hello, how are you?",
    is_read: true,
    deleted: false,
  };
  // let mm = await Message.create(m);
  // console.log(mm);
};

app.get("/", async (req, res) => {
  // const allUser = await User.findAll();
  // console.log(allUser);
  console.log("---------------++++++++++++");
  console.log(app.mountpath);
  res.send(["connection is ok"]);
  console.log("---------------++++++++++++");
});

app.post("/create/", async (req, res) => {
  console.log(req.body);
  console.log("create-------------------");
  try {
    const user = await User.create(req.body);
    console.log("...............");
    res.send({
      accout: {
        user_email: user.user_email,
        user_ph_no: user.user_ph_no,
      },
      user_email: user.user_email,
      user_ph_no: user.user_ph_no,
    });
    console.log("...............!");
    console.log("create-------------------!");
  } catch (error) {
    console.log(error.errors[0].message);
    res.send({
      "error message": error.errors[0].message,
      // 'error':erro
    });
  }
});

app.post("/loginUser/", async (req, res) => {
  console.log(req.body);
  const { user_email, user_password } = req.body;
  if (!user_email || !user_password) {
    return res.status(400).json({ error: "Email and password are required!" });
  }
  try {
    const user = await User.findOne({ where: { user_email, user_password } });

    if (user) {
      console.log("user is-->", user);
      res.cookie(
        "user",
        JSON.stringify({
          user_email: user.user_email,
          user_ph_no: user.user_ph_no,
          user_id: user.user_id,
        }),
        {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
          path: "/",
        }
      );

      res.json({
        message: "Login successful!",
        login: true,
        user_email: user.user_email,
        user_ph_no: user.user_ph_no,
        user: {
          user_email: user.user_email,
          user_ph_no: user.user_ph_no,
          user_id: user.user_id,
        },
      });
    } else {
      res.status(401).json({ error: "Invalid email or password!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/logOutUser/", (req, res) => {
  if (!req.isUser) {
    res.send({ message: "There is somthing Wrong!", isLogout: true });
  } else {
    console.log("it is else ");
    res.clearCookie("user", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });
    res.send({ isLogout: true, message: "Successfully logged out!" });
  }
});

app.post("/deleteUser/", async (req, res) => {
  console.log("--------------------");
  const { user_email, user_ph_no } = req.body;
  // console.log(uid);
  try {
    const delete_user = await User.destroy({
      where: {
        user_email: `${user_email}`,
        user_ph_no: `${user_ph_no}`,
      },
    });
    console.log(delete_user);
    res.send("User is deleted");
  } catch (error) {
    console.log(error);
    res.send("User is not deleted!");
  }
});

app.post("/addContect/", async (req, res) => {
  console.log("this is addContect.--->", req.originalUrl);
  const { ContactEmail, ContactName, phoneNumber } = req.body;
  if (!ContactName || !phoneNumber) {
    req.send({
      message: "please provide The Fields",
      contectCreated: false,
    });
  }
  try {
    if (req.isUser) {
      const isExist = await Contact.findAndCountAll(
        {
          where:{
            user_id: req.isUser.user_id,
            phoneNumber: req.body.phoneNumber
          }
        }
      )

      if(isExist.count>0){
        console.log("the count is ->",isExist.count);
        
        return res.send({message:"Already exists",error:"Already exists"})
      }
      let createContectcred = {
        user_id: req.isUser.user_id,
        ContactName: req.body.ContactName,
        phoneNumber: req.body.phoneNumber,
        ContactEmail: req.body.ContactEmail,
      };
      const newContect = await Contact.create(createContectcred);
      res.send({
        Contect: {
          ContactName: newContect.ContactName,
          phoneNumber: newContect.phoneNumber,
          ContactEmail: newContect.ContactEmail,
        },
        message: "Contact is Successfully Created",
        contectCreated: true,
      });
    } else {
      console.log("you are not a valied user");
      res.send({
        message: "you are not a valied user",
        contectCreated: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.send({
      message: "You are not a valied user . Re Login and try again",
      contectCreated: false,
    });
  }
});

app.post("/getAllContect/", async (req, res) => {
  console.log("getAllContect --------------------------------");

  try {
    if (req.isUser) {
      const response = await Contact.findAll({
        where: {
          user_id: req.isUser.user_id,
          Deleted: false,
        },
        attributes: {
          exclude: ["Deleted", "user_id", "uid", "createdAt", "updatedAt"],
        },
      });
      console.log(response);
      // const sendableData = response.filter
      res.send({ message: "it is a valied user", allContecet: response });
    } else {
      res.send({ message: "somthing problem,Login" });
    }
  } catch (error) {
    console.log("err is ->", error);
    res.send(error);
  }
  console.log("getAllContect --------------------------------!");
});

app.post("/getUserData/", async (req, res) => {
  console.log("getUserData------------------");
  try {
    const { phoneNumber } = req.body;
    if (phoneNumber || req.isUser) {
      console.log(`required data are ${phoneNumber}`);

      const userData = await Contact.findOne({
        where: { phoneNumber },
      });

      if (req.messageAble) {
        console.log("final data !!!!!!!!!!!!!!!!!!!!!!!");
        const { user_id, user_ph_no, user_name } = req.messageAble;
        const aboutContact = {
          user_id,
          user_ph_no,
          user_name,
          isActiveUser:true
        };
        console.log(aboutContact);

        console.log("send");
        res.send(aboutContact);
      } else {
        console.log({ message: "Invite For Connect!" });

        res.send({
          message: "Invite For Connect!",
          isActiveUser:false
        });
      }
    }
  } catch (error) {
    res.send(error);
  }
  console.log("getUserData------------------!");
});

server.listen(port, () => {
  console.log(`server is on port ${port}`);
});
