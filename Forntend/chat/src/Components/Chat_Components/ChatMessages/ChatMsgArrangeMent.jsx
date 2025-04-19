import { useContext, useEffect } from "react";
import Chat_recive from "./chat_recive";
import Chat_send from "./chat_send";
import { SocketContext } from "../../../Storage/Sockets";
import { AllStorage } from "../../../Storage/StorageProvider";
import { useParams } from "react-router";

export default function ChatMsgArrangeMent(params) {
  const { messages,Socket,setmessages } = useContext(SocketContext);
  const {phoneNumber} = useParams()
  const {userData} = useContext(AllStorage);
  return (<>
    <div>
      {Array.isArray(messages?.[phoneNumber]) &&
        messages[phoneNumber]?.map((element, index) =>
          element.sender_phoneNumber == userData.user_ph_no ? (
            <Chat_send key={index} message={element} />
          ) : (
            <Chat_recive key={index} message={element} />
          )
        )
      }
    </div>
  </>)
};
