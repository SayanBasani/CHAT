import { useContext } from "react";
import Chat_recive from "./chat_recive";
import Chat_send from "./chat_send";
import { SocketContext } from "../../../Storage/Sockets";
import { AllStorage } from "../../../Storage/StorageProvider";

export default function ChatMsgArrangeMent(params) {
  const { messages,Socket } = useContext(SocketContext);
  const {userData} = useContext(AllStorage);
  // console.log(messages);
  // console.log(userData);
  return (<>
    <div>
      {
        messages.map((element, index) =>
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
