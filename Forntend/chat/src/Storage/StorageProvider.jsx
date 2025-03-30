import { createContext, useEffect, useState } from "react";
import { getAllContect } from "./Account";
export const AllStorage = createContext();

export default function StorageProvider({ children }) {
  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1] || null;
  }
  const [userData, setuserData] = useState(() => {
    // const userLoginCr = localStorage.getItem('user');
    const  isUser = JSON.parse(decodeURIComponent(getCookie('userLoginCr')));
    // console.log("isUser-->",isUser);
    
    return isUser ? isUser : null;
  });
  const [allContectS, setallContectS] = useState(null);
  const [chatSideNavwidth,setchatSideNavwidth]=useState(false);

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
      chatSideNavwidth,setchatSideNavwidth
    }}>
      {children}
    </AllStorage.Provider>
  )
};
