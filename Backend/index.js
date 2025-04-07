import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import http from "http";
import sequelize from "./DB.js";
import cookieParser from "cookie-parser";
import FORNTEND_BASE_URL from "./config.js";
import { User, Message, Contact } from "./models.js";
import { InitializeSocket } from "./sockets.js";
import {
  checkIsUser,
  checkUserIsLoginANDValid,
  InitializeSocketWithCredential,
} from "./middleware.js";
import { Op, where } from "sequelize";

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
export const ACCESS_SECRET = "access123"; 
export const REFRESH_SECRET = "refresh123";
app.use(express.json());
app.use(
  cors({
    origin: FORNTEND_BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT"],
  })
);
app.use(cookieParser());
const port = process.env.PORT || 3001;
app.use(
  [
    "/addContect",
    "/logOutUser/",
    "/getAllContect/",
    "/getUserData/",
    "/chats/",
    "/CheckLogin/",
    "/getUserData/",
    "/updateUserData/",
  ],
  checkUserIsLoginANDValid
);
app.use(["/getContactData/"], checkIsUser);
// app.use(["/chat/"],InitializeSocketWithCredential);
export const server = http.createServer(app);
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
  try {
    // const { user1, user2 } = req.params;
    const { page = 1, limit = 10, lastMessageId } = req.query; // Default 10 messages

    const whereCondition = {};

    // If lastMessageId is provided, load older messages
    if (lastMessageId) {
      whereCondition.uid = { [Op.lt]: lastMessageId };
    }

    const messages = await Message.findAll({
      where: whereCondition,
      order: [["send_time", "DESC"]],
      limit: parseInt(limit),
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
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
      const _userData_ = {
        user_email: user.user_email,
        user_ph_no: user.user_ph_no,
        user_id: user.user_id,
      };
      console.log("user is-->", user);
      res.cookie(
        "userLoginCr",
        JSON.stringify({
          user_email: user.user_email,
          user_ph_no: user.user_ph_no,
        }),
        {
          httpOnly: false,
          secure: true,
          maxAge: 3 * 24 * 60 * 60 * 1000,
        }
      );
      res.cookie("user", JSON.stringify(_userData_), {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      const accessToken = jwt.sign(_userData_, ACCESS_SECRET, {
        expiresIn: "7d",
      });
      const refreshToken = jwt.sign(_userData_, REFRESH_SECRET, {
        expiresIn: "30d",
      });
      res.cookie(
        "Tokens",
        JSON.stringify({
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),
        {
          httpOnly: true,
          secure: true,
          sameSite: "Lax",
          path: "/",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        }
      );


      res.json({
        message: "Login successful!",
        login: true,
        user_email: user.user_email,
        user_ph_no: user.user_ph_no,
        user: _userData_,
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
    res.clearCookie("user", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });
    res.clearCookie("userLoginCr", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });
    res.send({ message: "There is somthing Wrong!", isLogout: true });
  } else {
    console.log("it is else ");
    res.clearCookie("user", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });
    res.clearCookie("userLoginCr", {
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
      const isExist = await Contact.findAndCountAll({
        where: {
          user_id: req.isUser.user_id,
          phoneNumber: req.body.phoneNumber,
        },
      });

      if (isExist.count > 0) {
        console.log("the count is ->", isExist.count);

        return res.send({ message: "Already exists", error: "Already exists" });
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
      // console.log(response);
      // const sendableData = response.filter
      console.log("getAllContect --------------------------------!");
      res.send({ message: "it is a valied user", allContecet: response });
    } else {
      res.send({ message: "somthing problem,Login" });
    }
  } catch (error) {
    console.log("err is ->", error);
    res.send(error);
  }
});

app.post("/getContactData/", async (req, res) => {
  console.log("getUserData------------------");
  try {
    const { phoneNumber } = req.body;
    if (phoneNumber || req.isUser) {
      console.log(`required data are ${phoneNumber}`);

      const userData = await Contact.findOne({
        where: { phoneNumber },
      });

      if (req.messageAble) {
        const { user_id, user_ph_no, user_name } = req.messageAble;
        const aboutContact = {
          user_id,
          user_ph_no,
          user_name,
          isActiveUser: true,
        };
        console.log(aboutContact);

        console.log("send");
        res.send(aboutContact);
      } else {
        console.log({ message: "Invite For Connect!" });

        res.send({
          message: "Invite For Connect!",
          isActiveUser: false,
        });
      }
    }
  } catch (error) {
    res.send(error);
  }
  console.log("getUserData------------------!");
});

app.post("/chats/", async (req, res) => {
  console.log("chat-----------------------");
  try {
    const { user_id, user_ph_no } = JSON.parse(req.userCookie);
    const reciver_phoneNumber = req.body.phoneNumber;
    // const lastMessageId = req.body.lastMessageId;
    const lastMessageId = req.body.lastMessageId
      ? parseInt(req.body.lastMessageId, 10)
      : null;
    const limit = req.body.limit;
    const reciverData = await User.findOne({
      where: { user_ph_no: reciver_phoneNumber },
    });
    if (!reciverData) {
      return res.send({ message: "user is not Found" });
    }
    const reciverUser_id = reciverData.user_id;

    // for limited message return (not return all messages)
    console.log(`the lastMessageId --> ${lastMessageId} --->`);
    const whereCondition = {
      [Op.or]: [
        { sender_id: user_id, receiver_id: reciverUser_id },
        { sender_id: reciverUser_id, receiver_id: user_id },
      ],
    };
    if (lastMessageId) {
      whereCondition.uid = { [Op.lt]: lastMessageId };
    }

    // Check if older messages exist
    const olderMessagesExist = await Message.findOne({
      where: { uid: { [Op.lt]: lastMessageId } },
    });
    console.log("Older messages exist:", olderMessagesExist ? "Yes" : "No");

    const RetrivedMessage = await Message.findAll({
      where: whereCondition,
      limit: parseInt(limit),
      order: [["uid", "DESC"]],
      attributes: [
        "uid",
        "message",
        "send_time",
        "receive_time",
        "seen_time",
        "is_read",
        "deleted",
        "sender_id",
        "receiver_id",
      ],
    });
    const AllMessage = RetrivedMessage.reverse();
    console.log("retrived messages ---->");
    // console.log();
    AllMessage.map((data) => console.log(data.uid));
    console.log("retrived messages ---->!");
    const formattedMessages = AllMessage.map((msg) => ({
      uid: msg.uid,
      message: msg.message,
      send_time: msg.send_time,
      receive_time: msg.receive_time,
      seen_time: msg.seen_time,
      is_read: msg.is_read,
      deleted: msg.deleted,
      // sender_id:msg.sender_id,
      // receiver_id:msg.receiver_id,
      // user_id:user_id,
      // reciverUser_id:reciverUser_id,
      sender_phoneNumber:
        msg.sender_id == user_id ? user_ph_no : reciver_phoneNumber, // Sender's phone number
      receiver_phoneNumber:
        msg.receiver_id != user_id ? reciver_phoneNumber : user_ph_no, // Receiver's phone number
    }));

    // console.log("All messages -->", formattedMessages);
    // console.log("all messages -->",AllMessage);
    console.log("chat-----------------------!");
    res.send({
      message: "Successfully messages retrived",
      AllMessage: formattedMessages,
    });
  } catch (error) {
    console.error("Error message is -->", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/CheckLogin/", (req, res) => {
  // console.log("req.isUser");
  // console.log(req.isUser);
  console.log("CheckLogin-->");
  if (req.isUser) {
    res.send({ isLogin: true });
  } else {
    res.clearCookie("userLoginCr", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });
    res.clearCookie("user", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });
    res.send({ isLogin: false });
  }
  console.log("CheckLogin-->!");
});

app.post("/getUserData/", async (req, res) => {
  try {
    if (req.isUser) {
      console.log("getUserData --->");
      const { user_name, user_email, user_ph_no } = req.isUser;
      // console.log("req.body--->",req.body);
      // console.log("req.body.user_email--->",req.body.user_email,"user_email-->",user_email);
      // console.log("req.body.user_ph_no--->",req.body.user_ph_no,"user_ph_no-->",user_ph_no);
      // if(req.body.user_email === user_email && req.body.user_ph_no === user_ph_no){
      // console.log("response is->>",user_name,user_email,user_ph_no);
      const respData = { user_name, user_email, user_ph_no };
      console.log("respData ---->", respData);
      return res.send(respData);
      // }
    } else {
      return res.send({ message: "Somthing Wrong !" });
    }
  } catch (error) {
    console.log("somthing Error Occers");
    return res.send({ message: "Internal Server Error" });
  }
});

app.put("/updateUserData/", async (req, res) => {
  try {
    console.log("it is in to change user data ------->");
    const data = req.body;
    const userData = req.isUser;
    if (data.newValue.length > 41) {
      return res.send({ message: "valuse is Too big", update: false });
    }
    if (userData) {
      if (data.field == "name") {
        userData.user_name = data.newValue;
      } else if (data.field == "email") {
        userData.user_email = data.newValue;
      } else if (data.field == "phone") {
        userData.user_ph_no = data.newValue;
      }
      await userData.save();
      return res.send({ message: "update successfull", update: true });
    }
    // console.log(userData);
    console.log("it is in to change user data ------->!");
    return res.send({ message: "Somthing Wrong", update: false });
  } catch (error) {
    console.error(error);
    return res.send({ message: "Internal server Error!", update: false });
  }
});

server.listen(port, () => {
  console.log(`server is on port ${port}`);
});
