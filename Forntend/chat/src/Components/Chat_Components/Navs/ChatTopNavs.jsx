import ChatNavDropdown from "./ChatNavDropdown";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AllStorage } from "../../../Storage/StorageProvider";
import SocketProvider, { socketConnReq, SocketContext } from "../../../Storage/Sockets";
import { Link } from "react-router";
export default function ChatTopNavs(params) {
  const ChatNavDropdownMenuRef = useRef();
  const ChatNavDropdownBtnRef = useRef();
  const [chatNavDropdownval, setchatNavDropdownval] = useState(false);
  const { userData, chatSideNavwidth, setchatSideNavwidth } = useContext(AllStorage);
  const {socket} = useContext(SocketContext);
  const handleDropDown = () => {
    setchatNavDropdownval((prev) => !prev)
  }
  const handleChatSideNav = () => {
    setchatSideNavwidth((prev) => !prev);
  }

  const handleOutSideClick = useCallback((e) => {
    if (
      !ChatNavDropdownBtnRef.current ||
      !ChatNavDropdownMenuRef.current ||
      ChatNavDropdownBtnRef.current.contains(e.target) ||
      ChatNavDropdownMenuRef.current.contains(e.target)
    ) {
      return;
    }
    // if (chatNavDropdownval || !(ChatNavDropdownBtnRef.current.contains(e.target) || ChatNavDropdownMenuRef.current.contains(e.target))) {
    setchatNavDropdownval(false)
    // }
  }, [setchatNavDropdownval])
  useEffect(() => {

    if (chatNavDropdownval) {
      document.addEventListener("click", handleOutSideClick);
      return () => {
        document.removeEventListener("click", handleOutSideClick);
      }
    }
  }, [chatNavDropdownval, handleOutSideClick])

  const handleYourProfileBtn = (event) => {
    console.log("profile_btn clicked");
    socketConnReq(userData)
    console.log("profile_btn clicked!");
  }
  // console.log(userData);
  return (
    <>
      {/* <nav className="border flex items-center h-"> */}

      <nav className="sticky top-0 z-30 darkTopNav p-3 h-14 grid grid-cols-[1fr_18fr_1fr_1fr] items-center ">
        <div>
          <button onClick={(e) => {
            handleChatSideNav(e);
          }} className="bi bi-list text-2xl"></button>
        </div>
        <div className="m-auto w-full flex items-center justify-center"> {/* chat search bar */}
          <input className="h-8 border-l-[1.5px] border-y rounded-l-lg px-4 py-1 w-[70%] max-w-[550px]" placeholder="Search" type="text" />
          <button className="h-8 cursor-pointer p-2 border-y border-r-[1.5px] rounded-r-lg flex justify-center items-center"><i className="bi bi-search"></i></button>
        </div>
        <div>
          <Link to={"/Profile"} className="relative">
            <button title={`${userData.user_ph_no}`} onClick={handleYourProfileBtn} className="w-10 h-10 rounded-sm profile_btn bi bi-person-circle text-2xl cursor-pointer"></button>
            <span class={`absolute bottom-0 left-6 transform translate-y-1/4 w-3.5 h-3.5 ${(socket || socket.connected) ?"bg-green-400":"bg-red-600"} border-2 border-white dark:border-gray-800 rounded-full`}></span>
            {/* <div className={`w-3 h-3 ${socket?"bg-green-400":"bg-red-600"}`}></div> */}
          </Link>
          {/* <Link to={"/Profile"}>
            <button title={`${userData.user_ph_no}`} onClick={handleYourProfileBtn} className="profile_btn bi bi-person-circle text-2xl cursor-pointer"></button>
            <div className={`w-3 h-3 ${socket?"bg-green-400":"bg-red-600"}`}></div>
          </Link> */}

        </div>
        <div title="refress the connection" className="flex justify-end">
          <button ref={ChatNavDropdownBtnRef} onClick={(e) => {
            handleDropDown(e);
          }} className="bi bi-three-dots-vertical cursor-pointer"></button>
        </div>
      </nav>
      <div ref={ChatNavDropdownMenuRef} className={`${chatNavDropdownval ? "" : "hidden"} shadowBox easyonOff z-30 ChatNavDropdown_div absolute top-14 right-10`}>
        <ChatNavDropdown />
      </div>
    </>
  )
};
