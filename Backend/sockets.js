import { Server } from "socket.io";

export let user_list = [];
export const InitializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {

    console.log("--------------------------");
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
      // console.log(`the list is -->`, user_list);
    } else {
      console.log("disconnect", socket.id);
      socket.disconnect(true);
    }
    console.log("--------------------------!");

    // handle the disconnect and update the user_list
    socket.on("disconnect", () => {
      console.log("disconnect --------------------------");
      user_list = user_list.filter((user) => user.socketId !== socket.id);
      console.log(`Disconnect user id is ${socket.id}`);
      console.log("disconnect --------------------------!");
    });

    socket.on("all_user",()=>{
      console.log("all_user -----------------------------");
      console.log(user_list);
      console.log("all_user -----------------------------!");
    })
    socket.on("all_user_id",()=>{
      console.log("all_user_id -----------------------------");
      console.log(Array.from(io.sockets.sockets.keys()));
      console.log("all_user_id -----------------------------!");
    })
    
  });
};
