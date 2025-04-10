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
      transports: ["websocket"],
      upgrade: false,
      withCredentials: true,
      auth: { user_email: data.user_email, user_ph_no: data.user_ph_no },
    });

    socket.on("connect", () => {
      // console.log("socket.id -->", socket.id);
    })

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
    return socket;
  } catch (error) {
    return null
  }
}

export default function SocketProvider({ children }) {
  const { phoneNumber } = useParams();
  const { userData } = useContext(AllStorage);
  const [socket, setsocket] = useState(null);

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

  // const [messages, setmessages] = useState([]);
  const [messages, setmessages] = useState({});
  // settout
  let count = 0;

  return (
    <SocketContext.Provider value={{ socket, messages, setmessages }}>
      {children}
    </SocketContext.Provider>
  )
};
