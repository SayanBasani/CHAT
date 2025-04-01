import { useContext, useEffect, useRef, useState } from "react";
import ChatMsgArrangeMent from "../../Components/Chat_Components/ChatMessages/ChatMsgArrangeMent";
import ChatMessagesBox from "../../Components/Chat_Components/ChatMessagesBox";
import { useParams } from "react-router-dom";
import { getAllMessagesBW_S_R, getContactData, getMessagesF } from "../../Storage/ApiRequest";
import { SocketContext } from "../../Storage/Sockets";
import { AllStorage } from "../../Storage/StorageProvider";
export default function Chat(params) {
  const { messages, setmessages } = useContext(SocketContext);
  const { messageLoading, setMessageLoading } = useContext(AllStorage);
  const { phoneNumber } = useParams();
  const [chatingWith, setchatingWith] = useState(false);
  const [isActiveUser, setisActiveUser] = useState(false);

  

  const loadMessages = async () => {
    setMessageLoading(true);
    // let lastMessageId = messages[0]?.uid ;
    let lastMessageId = messages[phoneNumber]?.[0]?.uid || null;
    // let lastMessageId = null ;
    let responseMsg = await getMessagesF({ phoneNumber, lastMessageId });
    if (!responseMsg || !responseMsg.AllMessage?.length) {
      console.error("Somthing Wrong");
      setMessageLoading(false)
    }
    const recivedOldMessage = responseMsg.AllMessage;

    setTimeout(() => {
      // setmessages([...recivedOldMessage,...messages]);

      setmessages(prevMsg => ({
        ...prevMsg, [phoneNumber]: [...recivedOldMessage, ...(prevMsg[phoneNumber] || [])]
      }));
    }, 500);

    setMessageLoading(false)
  }



  useEffect(() => {
    // console.log("messages are update");
    console.log(messages);
    // console.log("messages are update  !");
  }, [messages])

  useEffect(() => {
    console.log("phoneNumber -->", phoneNumber);
    const fetchContactData = async () => {
      if (!phoneNumber) {
        return;
      }
      try {
        const response = await getContactData({ phoneNumber });
        if (!response) {
          console.error("somthing Wrong!");
        }
        console.log("response --->" ,response);
        console.log(response.isActiveUser);
        setisActiveUser(response.isActiveUser);
        setchatingWith(response);
        loadMessages();
      } catch (err) {
        console.error("Error fetching contact data:", err);
      }
    };

    fetchContactData();
  }, [phoneNumber]);


  const handleScroll = async (e) => {
    // console.log(e.target);
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (Math.abs(scrollTop) + clientHeight >= scrollHeight - 10) {
      // console.log(e.target.clientHeight);
      // if (e.target.scrollTop === 0) {
      console.log("Loading older messages...");
      await loadMessages();  // Load more messages when scrolled to the top
    }
  };

  // const messageScrollRef = useRef();
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
                <div className="bg-red-600">{messageLoading ? "Loading..." : ""}</div>
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
