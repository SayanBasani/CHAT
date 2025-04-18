import { server } from "./index.js";
import { User } from "./models.js";
import { InitializeSocket } from "./sockets.js";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET, REFRESH_SECRET } from "./index.js";
export const checkUserIsLoginANDValid = async (req, res, next) => {
  console.log("md--------------------------------", req.path);
  // console.log(req.originalUrl);
  try {
    // const userCookie = req.cookies.user;
    const JwttokenCookie = req.cookies.Tokens;
    // console.log("the jwt retreved is --->", JwttokenCookie);
    if(JwttokenCookie == undefined){
      console.log("no data found jwtToken related !!");
      return 
    }
    const { accessToken, refreshToken } = JSON.parse(JwttokenCookie);
    // console.log( "JwttokenCookie ---->", accessToken, "------------", refreshToken, "!!" );
    let userJwtCookie = jwt.verify(accessToken, ACCESS_SECRET);
    console.log("!!!--------------------------------------!!!");
    req.userJwtCookie = userJwtCookie;
    if (!JwttokenCookie) {
      console.log("cookie is not found");
      req.isUser = null;
    } else {
      try {
        // const {user_email,user_ph_no,user_id} = JSON.parse(userCookie);
        const { user_email, user_ph_no, user_id } = userJwtCookie;
        // console.log(`${user_email} -- ${user_ph_no} -- ${user_id}`);
        const isUser = await User.findOne({
          where: { user_email, user_ph_no, user_id },
        });
        req.isUser = isUser || null;
        // console.log("the founded user is", isUser);
      } catch (error) {
        console.error("checkUserIsLoginANDValid error is -->", error);
        req.isUser = null;
      }
    }
    console.log("md--------------------------------!");
  } catch (error) {
    console.error(error);
  }
  next();
};

export const checkIsUser = async (req, res, next) => {
  console.log("checkIsUser --------------");
  try {
    // console.log(req.body);
    const { user_ph_no, phoneNumber } = req.body;
    if (!user_ph_no && !phoneNumber) {
      console.log("filled is missing");
    }
    // console.log(user_ph_no,"----",phoneNumber);

    const messageAble = await User.findOne({
      where: {
        user_ph_no: user_ph_no || phoneNumber,
      },
    });
    console.log("messageAble--> ", !(messageAble == null), " <--messageAble");
    console.log("checkIsUser --------------!");
    req.messageAble = messageAble || null;

    // if(user)
  } catch (error) {
    return res.send(error);
  }
  next();
};

export const InitializeSocketWithCredential = async (req, res, next) => {
  console.log("InitializeSocket---------------------");
  InitializeSocket(server, true);
  console.log("Initializetion is successful");
  console.log("InitializeSocket---------------------!");

  next();
};
