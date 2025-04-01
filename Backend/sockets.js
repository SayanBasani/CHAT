import { Server } from "socket.io";
import { Message, User } from "./models.js";

export let user_list = [];
export const InitializeSocket = (server, expressApp) => {
  console.log("socket---------------");
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
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

      const existingUserIndex = user_list.findIndex(
        (user) => user.user_email === socket.handshake.auth.user_email
      );
      if (existingUserIndex !== -1) {
        user_list[existingUserIndex].socketId = socket.id;
      } else {
        user_list.push({
          user_email: socket.handshake.auth.user_email,
          user_ph_no: socket.handshake.auth.user_ph_no,
          socketId: socket.id,
        });
      }
    } else {
      console.log("disconnect", socket.id);
      socket.disconnect(true);
    }

    // handle the disconnect and update the user_list
    socket.on("disconnect", () => {
      user_list = user_list.filter((user) => user.socketId !== socket.id);
      console.log(`Disconnect user id is ${socket.id}`);
    });

    socket.on("all_user", () => {
      console.log("all_user -----------------------------");
      console.log(user_list);
      console.log("all_user -----------------------------!");
    });

    socket.on("all_user_id", () => {
      console.log("all_user_id -----------------------------");
      console.log(Array.from(io.sockets.sockets.keys()));
      console.log("all_user_id -----------------------------!");
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
        console.log("serder_id-->", senderData.user_id);
        console.log("reciver_id-->", receiverData.user_id);
        console.log("message -->", message);
        const savedMessage = await Message.create({
          sender_id: senderData.user_id,
          receiver_id: receiverData.user_id,
          send_time: new Date().toISOString(),
          message: message,
        });
        // console.log("create message in DB is ->>",savedMessage);
        const online = user_list.filter((user) => user.user_ph_no == reciver);
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
      console.log("i am now sendin a response -------!");
    });
    socket.on("iAmOnline", (data) => {
      console.log("any user is online-------");
      console.log("the onlined user is ->", data);
      console.log("the onlined user online is ->", data.online);
      console.log("the onlined user user_ph_no is ->", data.online.user_ph_no);
      console.log("any user is online-------!");
    });
    // user_list.map((user) => {
    //   console.log(`online ->${socket.id} user ->`, user);
    // });
  });

  console.log("socket---------------!");
};
