import { Server } from "socket.io";
import { Message, User } from "./models.js";
import FORNTEND_BASE_URL from "./config.js";

// export let user_list = [];
export let user_list = new Map();
export let user_listByPhoneNo = new Map();
export let user_listBySocket = new Map();
const socketIdToPhone = {}; // Maps socket.id => phoneNumber
const phoneToSocketId = {}; // Maps phoneNumber => socket.id (if needed)
export const InitializeSocket = (server, expressApp) => {
  console.log("socket---------------");
  const io = new Server(server, {
    cors: {
      origin: FORNTEND_BASE_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`socket id is -->`, socket.id);
    // handle the storing of email , ph no. , socket id
    if (socket.handshake.auth.user_email) {
      // console.log(
      //   `your socket id is ${socket.id} || your auth is `,
      //   socket.handshake.auth
      // );
      const userEmail = socket.handshake.auth.user_email;
      const userPhone = socket.handshake.auth.user_ph_no;

      socket.broadcast.emit(`${userPhone}`,{
        phoneNumber:userPhone,
        isOnline:true
      })
      if (user_list.has(userEmail)) {
        const existingUser = user_list.get(userEmail);
        existingUser.socketId = socket.id;

        user_list.set(userEmail, existingUser);
        user_listByPhoneNo.set(userPhone, existingUser);
        user_listBySocket.set(socket.id, existingUser);
        
      } else {
        user_list.set(userEmail, {
          user_email: socket.handshake.auth.user_email,
          user_ph_no: socket.handshake.auth.user_ph_no,
          socketId: socket.id,
        });
        user_listByPhoneNo.set(userPhone, {
          user_email: socket.handshake.auth.user_email,
          user_ph_no: socket.handshake.auth.user_ph_no,
          socketId: socket.id,
        });
        user_listBySocket.set(socket.id, {
          user_email: socket.handshake.auth.user_email,
          user_ph_no: socket.handshake.auth.user_ph_no,
          socketId: socket.id,
        });
      }
    } else {
      console.log("disconnect", socket.id);
      socket.disconnect(true);
    }


    socket.on("all_user", () => {
      console.log("all_user --------", user_list, "<----------");
      const user = user_list.get("2@g.com");
      console.log("user",user);
      console.log("userph",user.user_ph_no);
        // if (user && user.socketId === socket.id) {
        //   user_list.delete(userPhone);
        //   user_listByPhoneNo.delete(userPhone);
    
        //   socket.broadcast.emit(`${userPhone}`, {
        //     phoneNumber: userPhone,
        //     isOnline: false,
        //   });
        // }
    });
    socket.on("all_userByPhone", () => {
      console.log("all_userByPhone --------", user_listByPhoneNo, "<----------");
    });
 
    socket.on("all_user_id", () => {
      console.log( "allUserId----",Array.from(io.sockets.sockets.keys()));
    });

    socket.on("sendMessage", async ({ message, reciver, sender }) => {
      const { user_ph_no } = socket.handshake.auth;
      if (sender.user_ph_no == user_ph_no) {
        console.log(
          "send the message------------",
          message,
          "--",
          reciver,
          "---",
          sender
        );
        const senderData = await User.findOne({ where: { user_ph_no } });
        const receiverData = await User.findOne({
          where: { user_ph_no: reciver },
        });
        console.log(
          "serder_id-->",
          senderData.user_id,
          "reciver_id-->",
          receiverData.user_id,
          "message -->",
          message
        );

        const savedMessage = await Message.create({
          sender_id: senderData.user_id,
          receiver_id: receiverData.user_id,
          send_time: new Date().toISOString(),
          message: message,
        });
        // console.log("create message in DB is ->>",savedMessage);
        // const online = user_list.filter((user) => user.user_ph_no == reciver); // change for Map()!
        const online = Array.from(user_list.values()).filter(
          (user) => user.user_ph_no == reciver
        );
        socket.emit("reciveMessage", {
          deleted: false,
          is_read: false,
          message: message,
          receive_time: null,
          seen_time: null,
          send_time: new Date().toISOString(),
          receiver_phoneNumber: reciver,
          sender_phoneNumber: user_ph_no,
          uid: 3,
        });
        if (online.length > 0) {
          const socketId = online[0].socketId;

          console.log(socketId);
          // socket.to(socketId).emit("reciveMessage", {
          //   message,
          //   sender,
          // });
          socket.to(socketId).emit("reciveMessage", {
            deleted: false,
            is_read: false,
            message: message,
            receive_time: null,
            seen_time: null,
            send_time: new Date().toISOString(),
            receiver_phoneNumber: reciver,
            sender_phoneNumber: user_ph_no,
            uid: 3,
          });
        } else {
          console.log(`Recipient (${reciver}) is not online.`);
        }
        console.log("send the message------------!");
      } else {
        console.log("not same");
      }
    });

    socket.broadcast.emit("iAmOnline", () => {
      console.log("i am now sendin a response -------");
      return { online: socket.handshake.auth };
    });
    // // check isOnline the reciver
    // socket.on("isOnline", (data) => {
    //   const phone = data.phoneNumber;
    //   const isOnline = Array.from(user_list.values()).find(
    //     (user) => user.user_ph_no === phone
    //   );
    //   socket.emit("isOnline?", {
    //     phoneNumber: phone,
    //     isOnline: !!isOnline,
    //     socketId: isOnline ? isOnline.socketId : null,
    //   });
    // });
    // gpt sollution for online /offlinr track

    socket.on(`isOnline`,(data)=>{
      const phoneNumber = data.phoneNumber
      // console.log("from is onlinedata-->",data);
      // console.log("Contect number-->",phoneNumber,"--- isOnline",user_listByPhoneNo.get(phoneNumber));
      // console.log("has?",user_listByPhoneNo.get(phoneNumber));
      socket.emit(`${phoneNumber}`,{
        isOnline:true,
        data:user_listByPhoneNo.get(phoneNumber),
      })
    })

    

    socket.on("register_for_online", (data) => {
      const { phoneNumber } = data;
      // console.log("register as-->",phoneNumber);
      socketIdToPhone[socket.id] = phoneNumber;
      phoneToSocketId[phoneNumber] = socket.id;

      // console.log(`User ${phoneNumber} registered with socket ID ${socket.id}`);
      // console.log("user_list",user_list);

      // Notify others this user is online
      socket.broadcast.emit(`${phoneNumber}`, {
        phoneNumber,
        isOnline: true,
      });
    });

    socket.on("disconnect", () => {
      // console.log("user_list",user_list,"user_listByPhoneNo--->",user_listByPhoneNo);
      const user = user_listBySocket.get(socket.id);
      const userPhone = user.user_ph_no;
      const userEmail = user.user_email;
      const userSocket = user.socketId;
      // console.log(user,"---",userPhone);

      if (userPhone) {
        console.log("user is is --",user);
        if (user && user.socketId === socket.id) {
          user_list.delete(userEmail);
          user_listByPhoneNo.delete(userPhone);
          user_listBySocket.delete(userSocket);
    
          socket.broadcast.emit(`${userPhone}`, {
            phoneNumber: userPhone,
            isOnline: false,
          });
        }
        delete socketIdToPhone[socket.id];
        delete phoneToSocketId[userPhone];
        // console.log("email---->",user_list,"<----");
        // console.log("ph---->",user_listByPhoneNo,"<----");
        // console.log("ph---->",user_listBySocket,"<----");
      }
    
      console.log(`User disconnected, socket ID: ${socket.id}`);
      socket.emit(`${userPhone}`,{
        phoneNumber:userPhone,
        isOnline:false
      })
    });
    

    // gpt sollution for online /offlinr track!!
  });

  console.log("socket---------------!");
};
