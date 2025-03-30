import { useContext, useEffect, useState } from "react";
import ChatMsgArrangeMent from "../../Components/Chat_Components/ChatMessages/ChatMsgArrangeMent";
import ChatMessagesBox from "../../Components/Chat_Components/ChatMessagesBox";
import { useParams } from "react-router-dom";
import { getAllMessagesBW_S_R, getContactData, getMessagesF } from "../../Storage/ApiRequest";
import { SocketContext } from "../../Storage/Sockets";
export default function Chat(params) {
  const {messages, setmessages} = useContext(SocketContext);
  const { phoneNumber } = useParams();
  const [chatingWith, setchatingWith] = useState(false);
  const [isActiveUser, setisActiveUser] = useState(false);

  const loadMessages = async () => {
    // console.log("last messsages are -->",messages);
    // const lastMessageId = messages[0]?.uid ;
    const lastMessageId = messages[0]?.uid ;
    // console.log("the last message uid is ",lastMessageId);
    const responseMsg = await getMessagesF({ phoneNumber ,lastMessageId});
    if (!responseMsg) {
      console.error("Somthing Wrong");
    }
    // console.log(responseMsg.AllMessage);
    const recivedOldMessage = responseMsg.AllMessage;
    setTimeout(()=>{
    setmessages([...recivedOldMessage,...messages]);
    },500);
  }

  useEffect(() => {
    // console.log("ph is --->", phoneNumber);
    const fetchContactData = async () => {
      if (!phoneNumber) {
        // console.log("No phone number provided for chat");
        return;
      }

      try {
        const response = await getContactData({ phoneNumber });
        if (!response) {
          console.error("somthing Wrong!");
        }
        setisActiveUser(response.isActiveUser);
        setchatingWith(response);

        // const responseMsg = await getAllMessagesBW_S_R({ phoneNumber });
        loadMessages();
      } catch (err) {
        console.error("Error fetching contact data:", err);
      }
    };

    fetchContactData();
  }, [phoneNumber]);

 
  const handleScroll = async (e) => {
    // console.log(e);
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (Math.abs(scrollTop) + clientHeight >= scrollHeight - 10) {
    // if (e.target.scrollTop === 0) {
      console.log("Loading older messages...");
      await loadMessages();  // Load more messages when scrolled to the top
    }
  };
  
  
  return (<>
    <main className="grid grid-rows-[50px_1fr_55px] h-full">
      {
        (isActiveUser && phoneNumber) ?
          (
            <>
              <nav className="px-2 justify-center items-center chatSubNav grid grid-cols-[50px_1fr_20px]">
                <i className="bi bi-person-circle text-2xl"></i>
                <div className="grid">
                  <span className="">{chatingWith.user_name}</span>
                  <span className="font-extralight text-sm">{phoneNumber}</span>
                </div>
                <i className="bi bi-three-dots-vertical"></i>
              </nav>
              <div onScroll={handleScroll} className="flex flex-col-reverse p-5 gap-2 overflow-auto">
                <ChatMsgArrangeMent />
              </div>
              <div className="w-full">
                <ChatMessagesBox />
              </div>
            </>
          )
          :
          (
            <>
              {(!isActiveUser && chatingWith) ?
                <>
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Invite
                  </div>
                </>
                :
                <>
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No chat selected. Please select a contact.
                  </div>
                </>
              }
            </>
          )
      }

    </main>
  </>)
};
