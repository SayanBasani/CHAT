import { createContext, useContext, useEffect, useState } from "react";
import { AllStorage } from "./StorageProvider";
import { io } from "socket.io-client";
import API_BASE_URL from "../config";
import { useParams } from "react-router";
import { getAllMessagesBW_S_R } from "./ApiRequest";

export const SocketContext = createContext();


export const socketConnReq = (data) => {
  // console.log("socketConnReq");
  try {
    if (!data) {
      return { message: "no data" }
    }
    const socket = io(`${API_BASE_URL}`, {
      auth: { user_email: data.user_email, user_ph_no: data.user_ph_no }
    });

    socket.on("connect", () => {
      // console.log("socket.id -->", socket.id);
    })

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
    return socket;
  } catch (error) {
    return { message: "somthing wrong!" }
  }
}

export default function SocketProvider({ children }) {
  const { phoneNumber } = useParams();
  const { userData } = useContext(AllStorage);
  const [socket, setsocket] = useState(null);

  // useEffect(() => {
  //   let socketInstance;
  //   if (userData) {
  //     socketInstance = io(`${API_BASE_URL}chat/`,{
  //       auth:{user_email: userData.user_email ,user_ph_no:userData.user_ph_no}
  //     }); 
  //     socketInstance.on("connect", () => {
  //       console.log(`socket id is ${socketInstance.id}`);
  //     })
  //     setSocket(socketInstance);
  //   }else {
  //     console.log("for socket you have to login");
  //   }
  //   return ()=>{
  //     if(socketInstance){
  //       socketInstance.disconnect();
  //       console.log("Socket disconnected");
  //     }
  //     setSocket(null);
  //   }
  // }, [userData]);

  useEffect(() => {
    let socketInstance;
    if (userData) {
      socketInstance = socketConnReq(userData);
      socketInstance.on("connect", () => {
        console.log(`socket id --> ${socketInstance.id}`);
      })
      setsocket(socketInstance);
    } else {
      console.log("for socket you have to login");
      setsocket(null);
    }
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        console.log("Socket disconnected");
      }
      setsocket(null);
    };
  }, [userData]);

  // // message
  // let message = [
  //   {
  //     "id": 1,
  //     "sender_id": 101,
  //     "receiver_id": 102,
  //     "send_time": "2025-03-22 10:00:00",
  //     "receive_time": "2025-03-22 10:00:02",
  //     "seen_time": "2025-03-22 10:00:05",
  //     "message": "Hey, how are you?",
  //     "is_read": true,
  //     "deleted": false
  //   },
  //   {
  //     "id": 2,
  //     "sender_id": 102,
  //     "receiver_id": 101,
  //     "send_time": "2025-03-22 10:00:10",
  //     "receive_time": "2025-03-22 10:00:12",
  //     "seen_time": "2025-03-22 10:00:15",
  //     "message": "I'm good! What about you?",
  //     "is_read": true,
  //     "deleted": false
  //   },
  //   {
  //     "id": 3,
  //     "sender_id": 101,
  //     "receiver_id": 102,
  //     "send_time": "2025-03-22 10:00:20",
  //     "receive_time": "2025-03-22 10:00:22",
  //     "seen_time": "2025-03-22 10:00:25",
  //     "message": "I'm doing well. Busy with work!",
  //     "is_read": true,
  //     "deleted": false
  //   },
  //   {
  //     "id": 4,
  //     "sender_id": 102,
  //     "receiver_id": 101,
  //     "send_time": "2025-03-22 10:00:30",
  //     "receive_time": "2025-03-22 10:00:32",
  //     "seen_time": "2025-03-22 10:00:35",
  //     "message": "I can relate! So much work these days.",
  //     "is_read": true,
  //     "deleted": false
  //   },
  // ]

  const [messages, setmessages] = useState([]);

  // settout
  let count = 0;
  // setTimeout(() => {
  //   console.log("...");
  //   let a = [{
  //     "id": count++,
  //     "sender_id": 101,
  //     "receiver_id": 102,
  //     "send_time": "2025-03-22 10:00:00",
  //     "receive_time": "2025-03-22 10:00:02",
  //     "seen_time": "2025-03-22 10:00:05",
  //     "message": "Hey, how are you?",
  //     "is_read": true,
  //     "deleted": false
  //   }]
  //   setmessages(messages.concat(a))
  //   console.log(messages);
  //   console.log("...!");
  //   count=count+1
  // })
  // settout!
  return (
    <SocketContext.Provider value={{ socket, messages, setmessages }}>
      {children}
    </SocketContext.Provider>
  )
};
