import { useContext, useEffect } from "react";
import { SocketContext } from "../../Storage/Sockets"
import { useForm } from "react-hook-form"
import { useParams } from "react-router";
import { AllStorage } from "../../Storage/StorageProvider";

export default function ChatMessagesBox() {
  const { register, handleSubmit, watch,reset, formState: { errors }, } = useForm();
  const {messages, setmessages} = useContext(SocketContext)
  const { socket } = useContext(SocketContext);
  const { userData } = useContext(AllStorage);
  const { phoneNumber } = useParams();
  
  useEffect(() => {
    try {
      if (!socket) {
        console.error("socket is null");
        return;
      }
      
      // socket.on("reciveMessage",({message,sender})=>{
      socket.on("reciveMessage",(data)=>{
        console.log("reciveMessage------------");
        console.log("in the msgBox--->",data);
        // console.log(typeof(data));
        setmessages((prevMsg) => {
          const currentMsgs = prevMsg[phoneNumber] || [];
          // ...prevMsg,[phoneNumber]:[...prevMsg[phoneNumber],data]
          return {
            ...prevMsg,[phoneNumber]:[...currentMsgs,data]
          }
        })
        console.log("reciveMessage------------!");
      })

      socket.on("iAmOnline",(data)=>{
        console.log("iAmOnline-------"+data);
      })
      return () => {
        console.log("Cleaning up socket listeners...");
        socket.off("sendMessage");
        socket.off("reciveMessage");
      };
    } catch (error) {
      console.error(error);
    }
  }, [socket]);

  const handleSendMessage = (e) => {
    console.log("send messgae ------------");
    const collMsg = e.collectedMessage.trim();
    const msgLen = collMsg.length;
    console.log({ collMsg, msgLen });
    if (msgLen > 0) {
      socket.emit("sendMessage", {
        message: collMsg,
        reciver: phoneNumber,
        sender: userData
      })
    }
    console.log("send messgae ------------!");
    reset()
  }

  const handleKeyDown = (e) => {
    // console.log(e.key);
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(handleSendMessage)();
    }
    
  }
  return (<>
    <div className="w-full px-2 pb-1 h-full">
      <form onSubmit={handleSubmit(handleSendMessage)} className="h-full w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">
        <div className="flex items-center gap-2 w-full justify-center px-3">
          {/* <input defaultValue={"    inpio   "} {...register("collectedMessage")} className="grow shrink basis-0 text-black text-x font-medium leading-4 focus:outline-none" placeholder="Type here..." /> */}
          
          <textarea onSubmit={(e)=>{
            e.target.value('');
          }} onKeyDown={handleKeyDown} {...register("collectedMessage", { maxLength: 1000 })} className="msgTextArea h-[50px] text-xl custom-textarea grow shrink basis-0 text-black leading-4 focus:outline-none" placeholder="Type here..." ></textarea>
        </div>
        <div className="flex items-center gap-2">
          <i className="bi bi-paperclip text-xl rotate-45"></i>
          <button className="cursor-pointer items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow ">
            <i className="bi bi-send text-sm"></i>
          </button>
        </div>
      </form>
    </div>
  </>)
};
