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
import { checkIsUserValid, getUserData } from "../../Storage/ApiRequest";
import { SocketContext } from "../../Storage/Sockets";
import Profile from "./Profile";
import Theme from "./Settings/Theme";
import ComingSoon from "../ComingSoon";

// import 

export default function ChatDashboard(params) {
  const navigate = useNavigate();
  const { userData, setuserData, userPData } = useContext(AllStorage);
  const { socket, setmessages } = useContext(SocketContext);
  const { phoneNumber } = useParams();
  // console.log("into ChatDashboard");
  useEffect(() => {
    ;;
    (
      async () => {
        const response = await getUserData();
        // console.log("response is --->", response);
        if (response) {
          setuserData(response)
        } else {
          navigate("/Login")
        }
      }
    )();;
  }, [])

  useEffect(() => {
    ;;
    (
      async (params) => {
        const checkIsUserResponse = await checkIsUserValid();
        // console.log("checkIsUserResponse-->", checkIsUserResponse);
        if (checkIsUserResponse.isLogin) {
          navigate("/Login");
        }
        else {
          // console.log("this is a logined user");
        }
      }
    )();;

    // socked related
    try {
      if (!socket) {
        console.error("socket is null");
        return;
      }
      socket.on("connect", () => {
        // console.log("socket is connected"); 
      })
      socket.on("reciveMessage", (data) => {
        // console.log("reciveMessage--------------=");
        // console.log("chat dashbord --->", data);
        // console.log(typeof (data));
        // setmessages((prevMsg) => ({
        //   ...prevMsg, [phoneNumber]: [...prevMsg[phoneNumber], data]
        // }))
        // console.log("reciveMessage------------!--=");
      });
    } catch (error) {
      console.error(error);
    }
    // socked related!
  }, [socket, userData])
  if (userData.isLogin) {
    return (
      <>
        <ChatTopNavs />
        <div className="flex gap-3 absolute top-0 z-0 w-screen">
          <ChatSideNav />
          <div className="z-0 absolute top-0 left-0 right-0 bottom-0 mt-14 ml-14 flex">
            <div className="w-full h-full overflow-auto">
              <Routes>
                {
                  phoneNumber ?
                    <Route path="/Chat/:phNumber" element={<Chat />} />
                    :
                    <Route path="/Chat/" element={<Chat />} />
                }
                <Route path="/Contects/" element={<Contects />} />
                <Route path="/Calls/" element={<Calls />} />
                <Route path="/Profile/" element={<Profile />} />
                <Route path="/Setting/" element={<Setting />} />
                <Route path="/Theme/" element={<Theme />} />
                <Route path="/ComingSoon/" element={<ComingSoon />} />
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
