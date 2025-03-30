import ChatNavDropdown from "./ChatNavDropdown";
import { useContext, useEffect, useRef, useState } from "react";
import { AllStorage } from "../../../Storage/StorageProvider";
import { socketConnReq } from "../../../Storage/Sockets";
export default function ChatTopNavs(params) {
  const ChatNavDropdownMenuRef = useRef();
  const ChatNavDropdownBtnRef = useRef();
  const [chatNavDropdownval, setchatNavDropdownval] = useState(false);
  const { userData, chatSideNavwidth, setchatSideNavwidth } = useContext(AllStorage);
  const handleDropDown = (event) => {
    setchatNavDropdownval(!chatNavDropdownval)
  }
  const handleChatSideNav = (event) => {
    setchatSideNavwidth(!chatSideNavwidth);
  }

  useEffect(() => {
    document.addEventListener("click", (e) => { handleOutSideClick(e) });
    function handleOutSideClick(e) {
      if (chatNavDropdownval || !(ChatNavDropdownBtnRef.current.contains(e.target) || ChatNavDropdownMenuRef.current.contains(e.target))) {
        console.log("outside");
        setchatNavDropdownval(false)
      }
    }
  }, [])
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
          <button title={`${userData.user_ph_no}`} onClick={handleYourProfileBtn} className="profile_btn bi bi-person-circle text-2xl cursor-pointer"></button>

        </div>
        <div title="refress the connection" className="flex justify-end">
          <button ref={ChatNavDropdownBtnRef} onClick={(e) => {
            handleDropDown(e);
          }} className="bi bi-three-dots-vertical cursor-pointer"></button>
        </div>
      </nav>
      <div ref={ChatNavDropdownMenuRef} className={`${chatNavDropdownval ? "" : "hidden"} z-30 ChatNavDropdown_div absolute top-14 right-10`}>
        <ChatNavDropdown />
      </div>
    </>
  )
};
