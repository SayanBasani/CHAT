import { createContext, useEffect, useState } from "react";
import { getAllContect } from "./Account";
import { getUserData } from "./ApiRequest";
export const AllStorage = createContext();

export default function StorageProvider({ children }) {

  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1] || null;
  }
  const [userData, setuserData] = useState(async () => {
    // isUser-->",{user_email: '1@g.com', user_ph_no: '1', user_id: '9a1f7fe9-266f-4211-992b-8b6b9bebdcce'});
    // const userLoginCr = localStorage.getItem('user');
    // const  isUser = JSON.parse(decodeURIComponent(getCookie('userLoginCr')));
    // try {
    //   const isUser = await getUserData();
    //   console.log("the responseData for user is ->>>",isUser);
    //   console.log("isUser-->",isUser);      
    //   return isUser ? isUser : null;
    // } catch (error) {
    //   return;
    // }

  });
  const [allContectS, setallContectS] = useState(null);
  const [chatSideNavwidth,setchatSideNavwidth]=useState(false);
  const [messageLoading,setMessageLoading]=useState(false);
  const [userPData,setuserPData]=useState(null);

  const chatSidebarOptions = [
    { 'name': 'Chat', 'icon_name': 'bi-chat' },
    { 'name': 'Contects', 'icon_name': 'bi-person' },
    { 'name': 'Call', 'icon_name': 'bi-telephone' },
  ]

  useEffect(() => {
    ;; (async () => {
      try {
        let responseAllContect = await getAllContect();
        if (responseAllContect.allContecet) {
          setallContectS(responseAllContect.allContecet);
        } else {
          console.log("no response res");
        }
        // console.log("complet");
      } catch (error) {
        console.log("error is occer");
        console.error(error);
      }
    })();;
  }, [, userData])

  return (
    <AllStorage.Provider value={{
      userData, setuserData, chatSidebarOptions, allContectS, setallContectS,
      chatSideNavwidth,setchatSideNavwidth,messageLoading,setMessageLoading,
      userPData,setuserPData,
    }}>
      {children}
    </AllStorage.Provider>
  )
};
