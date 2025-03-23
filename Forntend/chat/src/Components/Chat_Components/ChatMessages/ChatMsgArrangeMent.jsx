import { useContext } from "react";
import Chat_recive from "./chat_recive";
import Chat_send from "./chat_send";
import { SocketContext } from "../../../Storage/Sockets";

export default function ChatMsgArrangeMent(params) {
  const { messages,Socket } = useContext(SocketContext);
 Socket.emit("send_message")
  return (<>
    <div>
      {
        messages.map((element, index) =>
          element.sender_id == 101 ? (
            <Chat_send key={index} message={element} />
          ) : (
            <Chat_recive key={index} message={element} />
          )
        )
      }
    </div>
  </>)
};
