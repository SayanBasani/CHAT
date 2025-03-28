import { Link, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import ChatSideNav from "../../Components/Chat_Components/Navs/ChatSideNav";
import ChatTopNavs from "../../Components/Chat_Components/Navs/ChatTopNavs";
import Chat from "./Chat";
import Contects from "./Contects";
import Calls from "./Calls";
import Setting from "./Setting";
import { useContext, useEffect } from "react";
import { AllStorage } from "../../Storage/StorageProvider";
import TopNav from "../../Components/Navs/TopNav";
import { checkIsUserValid } from "../../Storage/ApiRequest";
export default function ChatDashboard(params) {
  const navigate = useNavigate();
  const { userData } = useContext(AllStorage);
  const { phoneNumber } = useParams();
  console.log("into ChatDashboard");
  useEffect(() => {
    ;;
    (
      async (params) => {
        const checkIsUserResponse = await checkIsUserValid();
        console.log(checkIsUserResponse);
        if(checkIsUserResponse.isLogin){
          navigate("/Login");
        }
        else{
          console.log("this is a logined user");
        }
      }
    )();;
  }, [])
  if (userData) {
    return (
      <>
        <ChatTopNavs />
        <div className="flex gap-3 absolute top-0 z-0 w-screen">
          <ChatSideNav />
          <div className="z-0 absolute top-0 left-0 right-0 bottom-0 mt-14 ml-14 flex">
            <div className="w-full h-full">
              <Routes>
                {
                  phoneNumber ?
                    <Route path="/Chat/:phNumber" element={<Chat />} />
                    :
                    <Route path="/Chat/" element={<Chat />} />
                }
                <Route path="/Contects/" element={<Contects />} />
                <Route path="/Calls/" element={<Calls />} />
                <Route path="/Setting/" element={<Setting />} />
              </Routes>
            </div>
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div className="">
          <TopNav />
          <div className="grid justify-center items-center gap-5">
            <span className="text-2xl">Login at first </span>
            <div className="flex justify-center gap-3">
              <Link className="text-xl rounded-2xl border px-3 py-2 hover:bg-gray-200  hover:text-black transition-all" to={'/Login'}>Login</Link>
              <Link className="text-xl rounded-2xl border px-3 py-2 hover:bg-gray-200  hover:text-black transition-all" to={'/Singup'}>Singup</Link>
            </div>
          </div>
        </div>
      </>
    )
  }
};
