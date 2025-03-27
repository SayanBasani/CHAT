import ChatNavDropdown from "./ChatNavDropdown";
import { useContext } from "react";
import { AllStorage } from "../../../Storage/StorageProvider";
import { socketConnReq } from "../../../Storage/Sockets";
export default function ChatTopNavs(params) {
  const {userData} = useContext(AllStorage);
  const handleDropDown = (event)=>{
    const ChatNavDropdown_div = document.querySelector('.ChatNavDropdown_div');
    ChatNavDropdown_div.classList.toggle('hidden');
  }
  const handleChatSideNav = (event)=>{
    const ChatSideNav = document.querySelector(".ChatSideNav");
    if(ChatSideNav.classList.contains('w-14')){
      ChatSideNav.classList.add('w-44')
      ChatSideNav.classList.remove('w-14')
    }else{
      ChatSideNav.classList.add('w-14')
      ChatSideNav.classList.remove('w-44')
    }
    
    
  }
  const handleYourProfileBtn = (event)=>{
    console.log("profile_btn clicked");
    socketConnReq(userData)
    console.log("profile_btn clicked!");
  }
  return (
    <>
      {/* <nav className="border flex items-center h-"> */}
    
      <nav className="sticky top-0 z-30 darkTopNav p-3 h-14 grid grid-cols-[1fr_18fr_1fr_1fr] items-center ">
        <div>
          <button onClick={(e)=>{
            handleChatSideNav(e);
          }} className="bi bi-list text-2xl"></button>
        </div>
        <div className="m-auto w-full flex items-center justify-center"> {/* chat search bar */}
          <input className="h-8 border-l-[1.5px] border-y rounded-l-lg px-4 py-1 w-[70%] max-w-[550px]" placeholder="Search" type="text" />
          <button className="h-8 cursor-pointer p-2 border-y border-r-[1.5px] rounded-r-lg flex justify-center items-center"><i className="bi bi-search"></i></button>
        </div>
        <div>
          <button onClick={handleYourProfileBtn} className="profile_btn bi bi-person-circle text-2xl cursor-pointer"></button>
           
        </div>
        <div title="refress the connection" className="flex justify-end">
          <button  onClick={(e)=>{
            handleDropDown(e);
          }} className="bi bi-three-dots-vertical cursor-pointer"></button>
        </div>
      </nav>
      <div className="z-30 hidden ChatNavDropdown_div absolute top-14 right-10">
        <ChatNavDropdown/>
      </div>
    </>
  )
};
