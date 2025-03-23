import { User } from "./models.js";

export const checkUserIsLoginANDValid = async(req,res,next)=>{
  console.log("md--------------------------------");
  console.log(req.originalUrl);
  const userCookie = req.cookies.user;
  if (!userCookie){
    console.log("cookie is not found");
    req.isUser = null;
  }else{
    try {
      const {user_email,user_ph_no,user_id} = JSON.parse(userCookie);
      console.log(`${user_email} -- ${user_ph_no} -- ${user_id}`);
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