import { Route,Routes } from "react-router-dom"
import ChatSideNav from "../../Components/Chat_Components/Navs/ChatSideNav"
import ChatTopNavs from "../../Components/Chat_Components/Navs/ChatTopNavs"
import Chat from "./Chat"
import Contects from "./Contects"
import Calls from "./Calls"
import Setting from "./Setting"
export default function ChatDashboard(params) {
  return (
    <>
    <ChatTopNavs/>
    <div className="flex gap-3 absolute top-0 z-0 w-screen">
      <ChatSideNav/>
      <div className="z-0 absolute top-0 left-0 right-0 bottom-0 mt-14 ml-14 flex">
        <div className="w-full h-full">
        <Routes>
          <Route path="/Chat/" element={<Chat/>}/>
          <Route path="/Contects/" element={<Contects/>}/>
          <Route path="/Calls/" element={<Calls/>}/>
          <Route path="/Setting/" element={<Setting/>}/>
        </Routes>
      </div>
      </div>
    </div>
    </>
  )
};
