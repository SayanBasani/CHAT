import Chat_recive from "../../Components/Chat_Components/ChatMessages/chat_recive";
import Chat_send from "../../Components/Chat_Components/ChatMessages/chat_send";
import ChatMsgArrangeMent from "../../Components/Chat_Components/ChatMessages/ChatMsgArrangeMent";
import ChatMessagesBox from "../../Components/Chat_Components/ChatMessagesBox";

export default function Chat(params) {
  return(<>
  <style>
  </style>
  <main className="grid grid-rows-[1fr_50px] h-full">
    <div className="flex flex-col-reverse p-5 gap-2 overflow-auto">
      <ChatMsgArrangeMent/>
    </div>
    <div className="w-full">
      <ChatMessagesBox/>
    </div>
  </main>
  </>)
};
