import { useContext, useRef } from "react";
import DarkToggle from "../../Buttons/DarkToggle";
import { AllStorage } from "../../../Storage/StorageProvider";
import { NavLink } from "react-router-dom"
export default function ChatSideNav() {
  const { chatSidebarOptions,chatSideNavwidth,setchatSideNavwidth } = useContext(AllStorage);
  const chatSideNavRef = useRef();
  const chatSideNavBtnRef = useRef();
  // console.log(chatSidebarOptions);

  return (
    <>
      <div className={`${chatSideNavwidth?"w-40":"w-14"} z-10 pt-18 h-screen w-14 darkTopNav flex flex-col gap-3 p-4 overflow-hidden`}>
        <NavLink to={'/chat/'} className={({ isActive }) =>
          `${isActive ? "text-blue-500" : ""} flex gap-4 items-center`}>
          <i className="bi bi-chat text-2xl"></i>
          <span className="text-x font-semibold">Chat</span>
        </NavLink>
        <NavLink to={'/contects'} className={({ isActive }) => `${isActive ? "text-blue-500" : ""} flex gap-4 items-center`}>
          <i className="bi bi-person text-2xl"></i>
          <span className="text-x font-semibold">Contects</span>
        </NavLink>
        <NavLink to={'/calls'} className={({ isActive }) => `${isActive ? "text-blue-500" : ""} flex gap-4 items-center`}>
          <i className="bi bi-telephone text-2xl"></i>
          <span className="text-x font-semibold">Call</span>
        </NavLink>
        <NavLink to={'/setting'} className={({ isActive }) => `${isActive ? "text-blue-500" : ""} absolute bottom-15 flex gap-4 items-center`}>
          <i className="bi bi-gear text-2xl"></i>
        </NavLink>

        <div className="absolute bottom-5 w-9 text-2xl">
          <DarkToggle />
        </div>
      </div>
    </>
  )
};
