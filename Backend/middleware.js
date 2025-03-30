import { server } from "./index.js";
import { User } from "./models.js";
import { InitializeSocket } from "./sockets.js";

export const checkUserIsLoginANDValid = async(req,res,next)=>{
  console.log("md--------------------------------");
  // console.log(req.originalUrl);
  const userCookie = req.cookies.user;
  req.userCookie = userCookie;
  if (!userCookie){
    console.log("cookie is not found");
    req.isUser = null;
  }else{    
    // console.log("cooke is -->",userCookie);
    try {
      const {user_email,user_ph_no,user_id} = JSON.parse(userCookie);
      // console.log(`${user_email} -- ${user_ph_no} -- ${user_id}`);
      const isUser = await User.findOne({where:{user_email,user_ph_no,user_id}});
      req.isUser = isUser || null;
    } catch (error) {
      console.error("checkUserIsLoginANDValid error is -->",error);
      req.isUser = null;
    }
  }
  console.log("md--------------------------------!");
  next();
}

export const checkIsUser = async(req,res,next)=>{
  console.log("checkIsUser --------------");
  try {
    console.log(req.body);
    const { user_ph_no,phoneNumber } = req.body;
    if(!user_ph_no && !phoneNumber){
    console.log("filled is missing");
        
    }
    console.log(user_ph_no,"----",phoneNumber);
    
    const messageAble =await User.findOne({where:{
      user_ph_no :user_ph_no || phoneNumber
    }})
    console.log("messageAble--> ",!(messageAble==null)," <--messageAble");
    console.log("checkIsUser --------------!");
    req.messageAble = messageAble || null;
    
    // if(user)
  } catch (error) {
    return res.send(error)
  }
  next()
}

export const InitializeSocketWithCredential = async(req,res,next)=>{
  console.log("InitializeSocket---------------------");
  InitializeSocket(server,true);
  console.log("Initializetion is successful");
  console.log("InitializeSocket---------------------!");
  
  next();
}