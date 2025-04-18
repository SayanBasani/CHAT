import { useContext, useEffect, useRef, useState } from "react";
import ChatMsgArrangeMent from "../../Components/Chat_Components/ChatMessages/ChatMsgArrangeMent";
import ChatMessagesBox from "../../Components/Chat_Components/ChatMessagesBox";
import { useParams } from "react-router-dom";
import { getAllMessagesBW_S_R, getContactData, getMessagesF } from "../../Storage/ApiRequest";
import { SocketContext } from "../../Storage/Sockets";
import { AllStorage } from "../../Storage/StorageProvider";
export default function Chat(params) {
  const { messages, setmessages, socket, trackOnline, settrackOnline } = useContext(SocketContext);
  const { messageLoading, setMessageLoading } = useContext(AllStorage);
  const { phoneNumber } = useParams();
  const [chatingWith, setchatingWith] = useState(false);
  const [isActiveUser, setisActiveUser] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isOnline, setisOnline] = useState(false);




  const loadMessages = async () => {
    if (isFetching) return;
    setIsFetching(true);
    setMessageLoading(true);
    try {
      // const lastMessageId = messages[phoneNumber]?.[0]?.uid || null;
      const lastMessageId = Array.isArray(messages[phoneNumber]) ? messages[phoneNumber][0]?.uid : null;
      const responseMsg = await getMessagesF({ phoneNumber, lastMessageId });

      if (!responseMsg || !responseMsg.AllMessage?.length) {
        console.log("i think it is first message");
        return;
      }

      const recivedOldMessage = responseMsg.AllMessage;
      setTimeout(() => {
        setmessages(prevMsg => {
          const existingUids = new Set((prevMsg[phoneNumber] || []).map(m => m.uid));
          const uniqueNewMessages = recivedOldMessage.filter(m => !existingUids.has(m.uid));
          return {
            ...prevMsg,
            [phoneNumber]: [...uniqueNewMessages, ...(prevMsg[phoneNumber] || [])]
          };
        });
      }, 500);
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setMessageLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => { console.log(messages); }, [messages])

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
        // console.log("response --->", response);
        // console.log(response.isActiveUser);
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
      await loadMessages();  // Load more messages when scrolled to the top
    }
  };

  // useEffect(() => {
  //   if (!phoneNumber || !socket) return;

  //   socket.emit("isOnline", {
  //     phoneNumber: phoneNumber
  //   })
  //   const handleIsOnline = (data) => {
  //     console.log("data from server (isOnline?) =>", data);
  //     setisOnline(data); // update state based on server response
  //   };
  //   // Set listener
  //   socket.on("isOnline?", handleIsOnline);

  //   // Clean up the listener when component unmounts or phoneNumber/socket changes
  //   return () => {
  //     socket.off("isOnline?", handleIsOnline);
  //   };
  // }, [socket, phoneNumber]);
  // const messageScrollRef = useRef();


  useEffect(() => {
    if (!socket || !phoneNumber) return;

    const handleStatusUpdate = (data) => {
      const { isOnline, phoneNumber: dataPhone } = data;
      if (dataPhone === phoneNumber) {
        setisOnline(data);
        settrackOnline((prev) => ({
          ...prev,
          [phoneNumber]: isOnline,
        }))
      }
    };
    socket.on(`${phoneNumber}`, handleStatusUpdate);

    return () => {
      socket.off(`${phoneNumber}`, handleStatusUpdate);
    };
  }, [socket, phoneNumber]);


  // useEffect(()=>{
  //   console.log("isOnline--->",isOnline);
  // })
  return (<>
    <main className="grid grid-rows-[50px_1fr_55px] h-full">
      {
        (isActiveUser && phoneNumber) ?
          (
            <>
              <nav className="px-2 justify-center items-center chatSubNav grid grid-cols-[50px_1fr_20px]">
                <span className="relative">
                  <i className="w-10 h-10 rounded-full bi bi-person-circle text-2xl"></i>
                  <span class={`absolute bottom-0 left-5 transform translate-y-1/4 w-3.5 h-3.5 ${isOnline.isOnline?"bg-green-400":"bg-red-600"} border-2 border-white dark:border-gray-800 rounded-full`}></span>
                </span>
                <div className="grid">
                  <span className="">{chatingWith.user_name}</span>
                  <span className="font-extralight text-sm flex gap-5">{phoneNumber} {isOnline.isOnline ? "online" : "offline"}</span>
                </div>
                <i className="bi bi-three-dots-vertical"></i>
              </nav>
              <div onScroll={handleScroll} className="flex flex-col-reverse p-5 gap-2 overflow-auto">
                <ChatMsgArrangeMent />
                {/* <div className="bg-red-600">{messageLoading ? "Loading..." : ""}</div> */}
                <div className="flex justify-center items-center ">

                  <div className={`${messageLoading ? "" : "hidden"}`} role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>

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
