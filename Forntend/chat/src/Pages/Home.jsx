import { useContext } from "react";
import TopNav from "../../src/Components/Navs/TopNav"
import { SocketContext } from "../Storage/Sockets";
export default function Home() {
  const {socket}=useContext(SocketContext);
  
  const handleGetUserList = ()=>{
    if (socket){
      socket.emit("all_user")
    }else {
      console.log("Socket is not connected");
    }
  }
  const handleGetall_userByPhone = ()=>{
    if (socket){
      socket.emit("all_userByPhone")
    }else {
      console.log("Socket is not connected");
    }
  }
  const handleGetIdList = ()=>{
    if (socket){
      socket.emit("all_user_id")
    }else {
      console.log("Socket is not connected");
    }
  }
  return <>
  <div className="">
    <TopNav/>
    <div className="flex justify-center gap-3">
      <button onClick={handleGetUserList} className="border px-3 py-2 text-xl get_all_user_list">user list</button>
      <button onClick={handleGetall_userByPhone} className="border px-3 py-2 text-xl get_all_user_list">user list By Phone</button>
      <button onClick={handleGetIdList} className="border px-3 py-2 text-xl get_all_user_list_id">user list of id</button>
    </div>
  </div>
  </>
}