import { useContext, useEffect, useRef, useState } from "react";
import DarkToggle from "../../Buttons/DarkToggle";
import { AllStorage } from "../../../Storage/StorageProvider";
import { NavLink } from "react-router-dom";
import ChatSelectContact from "./ChatSelectContact";

export default function ChatSideNav() {
  const { chatSideNavwidth } = useContext(AllStorage);
  const chatContactRef = useRef();
  const chatCallRef = useRef();
  const chatMessageRef = useRef();
  const chatSubSideNavRef = useRef();

  const [prevclick, setprevclick] = useState();

  // Refs to store the latest state values
  const prevclickRef = useRef(prevclick);

  // Update refs whenever state changes
  useEffect(() => {
    prevclickRef.current = prevclick;
  }, [prevclick]);

  useEffect(() => {
    document.addEventListener("click", handleSubSideNavONOFF);
    return () => {
      document.removeEventListener("click", handleSubSideNavONOFF);
    };
  }, []);

  const handleSubSideNavONOFF = (event) => {
    // console.log("the prevclick is ->", prevclick, "---", prevclickRef);

    if (chatMessageRef.current && chatMessageRef.current.contains(event.target)) {
      setprevclick(event.target);
      if (prevclickRef.current && chatMessageRef.current.contains(prevclickRef.current)) {
        chatSubSideNavRef.current.classList.toggle("hidden")
      }
    } else if (chatCallRef.current && chatCallRef.current.contains(event.target)) {
      setprevclick(event.target)
      if (prevclickRef.current && chatCallRef.current.contains(prevclickRef.current)) {
        chatSubSideNavRef.current.classList.toggle("hidden")
      }
    } else {
      chatSubSideNavRef.current.classList.add("hidden");
    }
  };

  return (
    <>
      <div className={`${chatSideNavwidth ? "w-40" : "w-14"} z-10 pt-18 h-screen w-14 darkTopNav flex flex-col gap-y-3 p-4 overflow-hidden`}
      >
        <NavLink ref={chatMessageRef} to={"/chat/"} className={({ isActive }) => `${isActive ? "text-blue-500" : ""} flex gap-4 items-center`} >
          <i className="bi bi-chat text-2xl"></i>
          <span className="text-x font-semibold">Chat</span>
        </NavLink>
        <NavLink ref={chatContactRef} to={"/contects"} className={({ isActive }) => `${isActive ? "text-blue-500" : ""} flex gap-4 items-center`} >
          <i className="bi bi-person text-2xl"></i>
          <span className="text-x font-semibold">Contects</span>
        </NavLink>
        <NavLink ref={chatCallRef} to={"/calls"} className={({ isActive }) => `${isActive ? "text-blue-500" : ""} flex gap-4 items-center`} >
          <i className="bi bi-telephone text-2xl"></i>
          <span className="text-x font-semibold">Call</span>
        </NavLink>

        <NavLink to={"/setting"} className={({ isActive }) => `${isActive ? "text-blue-500" : ""} absolute bottom-15 flex gap-4 items-center`} >
          <i className="bi bi-gear text-2xl"></i>
        </NavLink>

        <div className="absolute bottom-5 w-9 text-2xl">
          <DarkToggle />
        </div>
      </div>
      <div ref={chatSubSideNavRef} className={`easyonOff shadowBox z-20 pt-18 darkTopNav hidden`} >
        <ChatSelectContact />
      </div>
    </>
  );
}