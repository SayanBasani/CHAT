import { createContext, useContext, useEffect, useState } from "react";
import { AllStorage } from "./StorageProvider";
import { io } from "socket.io-client";
import API_BASE_URL from "../config";

export const SocketContext = createContext();

export default function SocketProvider({ children }) {
  const { userData } = useContext(AllStorage);
  // const [message, setmessage] = useState();
  const [Socket, setSocket] = useState(null); 

  useEffect(() => {
    let socketInstance;
    if (userData) {
      socketInstance = io(API_BASE_URL,{
        auth:{user_email: userData.user_email ,user_ph_no:userData.user_ph_no}
      }); 
      socketInstance.on("connect", () => {
        console.log(`socket id is ${socketInstance.id}`);
      })
      setSocket(socketInstance);
    }else {
      console.log("for socket you have to login");
    }
    return ()=>{
      if(socketInstance){
        socketInstance.disconnect();
        console.log("Socket disconnected");
      }
      setSocket(null);
    }
  }, [userData]);

  // message
  let message = [
    {
      "id": 1,
      "sender_id": 101,
      "receiver_id": 102,
      "send_time": "2025-03-22 10:00:00",
      "receive_time": "2025-03-22 10:00:02",
      "seen_time": "2025-03-22 10:00:05",
      "message": "Hey, how are you?",
      "is_read": true,
      "deleted": false
    },
    {
      "id": 2,
      "sender_id": 102,
      "receiver_id": 101,
      "send_time": "2025-03-22 10:00:10",
      "receive_time": "2025-03-22 10:00:12",
      "seen_time": "2025-03-22 10:00:15",
      "message": "I'm good! What about you?",
      "is_read": true,
      "deleted": false
    },
    {
      "id": 3,
      "sender_id": 101,
      "receiver_id": 102,
      "send_time": "2025-03-22 10:00:20",
      "receive_time": "2025-03-22 10:00:22",
      "seen_time": "2025-03-22 10:00:25",
      "message": "I'm doing well. Busy with work!",
      "is_read": true,
      "deleted": false
    },
    {
      "id": 4,
      "sender_id": 102,
      "receiver_id": 101,
      "send_time": "2025-03-22 10:00:30",
      "receive_time": "2025-03-22 10:00:32",
      "seen_time": "2025-03-22 10:00:35",
      "message": "I can relate! So much work these days.",
      "is_read": true,
      "deleted": false
    },
    {
      "id": 4,
      "sender_id": 102,
      "receiver_id": 101,
      "send_time": "2025-03-22 10:00:30",
      "receive_time": "2025-03-22 10:00:32",
      "seen_time": "2025-03-22 10:00:35",
      "message": "I can relate! So much work these days.",
      "is_read": true,
      "deleted": false
    },
    {
      "id": 4,
      "sender_id": 102,
      "receiver_id": 101,
      "send_time": "2025-03-22 10:00:30",
      "receive_time": "2025-03-22 10:00:32",
      "seen_time": "2025-03-22 10:00:35",
      "message": "I can relate! So much work these days.",
      "is_read": true,
      "deleted": false
    },
    {
      "id": 4,
      "sender_id": 102,
      "receiver_id": 101,
      "send_time": "2025-03-22 10:00:30",
      "receive_time": "2025-03-22 10:00:32",
      "seen_time": "2025-03-22 10:00:35",
      "message": "I can relate! So much work these days.",
      "is_read": true,
      "deleted": false
    },
    
    
  ]
  const [messages,setmessages] = useState(message);
  useEffect(() => {
    console.log('using useEffct detect changes',userData);
  }, [userData])
  return (
    <SocketContext.Provider value={{ Socket,messages }}>
      {children}
    </SocketContext.Provider>
  )
};
