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
    const RECONNECTION_ATTEMPTS = 5;
    const RECONNECTION_DELAY = 3000;
    const socket = io(`${API_BASE_URL}`, {
    // const socket = io(`ws://localhost:3001/`, {
      transports: ["websocket"],
      upgrade: false,
      withCredentials: true,
      auth: { user_email: data.user_email, user_ph_no: data.user_ph_no },
      timeout: 5000,
      // for automatic reconnect try
      reconnection: true,
      reconnectionAttempts: RECONNECTION_ATTEMPTS,
      reconnectionDelay: RECONNECTION_DELAY,
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
  // const { phoneNumber } = useParams();
  const { userData,allContectS, setallContectS } = useContext(AllStorage);
  const [socket, setsocket] = useState(null);

  useEffect(() => {
    let socketInstance;
    if (userData) {
      socketInstance = socketConnReq(userData);
      if (socketInstance) {
        socketInstance.on("connect", () => {
          console.log(`socket id --> ${socketInstance.id}`);
        })
        setsocket(socketInstance);
      }
      else {
        console.error("Failed to initialize socket.");
      }
    } else {
      // console.log("for socket you have to login");
      setsocket(null);
    }
    return () => {
      if (socketInstance) {
        socketInstance.off();
        socketInstance.disconnect();
        console.log("Socket disconnected");
      }
      setsocket(null);
    };
  }, [userData]);
  // register for he is online
  useEffect(() => {
    if (socket) {
      const ph_Number  = userData?.user_ph_no; // Replace with your actual logic
      if (ph_Number) {
        setInterval(()=>{
          socket.emit("register_for_online", { "phoneNumber":ph_Number });
        },5000)
      }
    }
  }, [socket,userData]);

  // const [messages, setmessages] = useState([]);
  const [messages, setmessages] = useState({});
  const [trackOnline,settrackOnline] = useState({});
  // settout


  // for track which contect are online and ofline 
  useEffect(() => {
    try {

      if (!allContectS || !socket) { return; }
      const listeners = [];
      allContectS.forEach(element => {
        if (!element.phoneNumber) { return; }
        const contectPhNo = element.phoneNumber;

        const handleStatusUpdate = (data) => {
          const { isOnline, phoneNumber: dataPhone } = data;
          if (dataPhone === contectPhNo) {
            element.isOnline = isOnline;
            element.lastSeen = Date.now();
            settrackOnline((prev) => ({
              ...prev,
              [contectPhNo]: isOnline,
              lastSeen: Date.now(),
            }))
          }
        };

        socket.emit(`isOnline`, { "phoneNumber": contectPhNo });
        socket.on(`${contectPhNo}`, handleStatusUpdate);
        listeners.push({ contectPhNo, handler: handleStatusUpdate });
      });
      return () => {
        listeners.forEach(({ contectPhNo, handler }) => {
          socket.off(contectPhNo, handler)
        })
      }
    } catch (error) {
      console.error({ manualError: "online check error!!" });
    }
  }, [allContectS, socket]);

  // useEffect(()=>{
  //   setInterval(() => {
  //     socket?console.log("socket.connected-->",socket.connected):console.log("socket->>",socket);
  //   }, 4000);
  // })
  return (
    <SocketContext.Provider value={{ socket, messages, setmessages,trackOnline,settrackOnline }}>
      {children}
    </SocketContext.Provider>
  )
};
