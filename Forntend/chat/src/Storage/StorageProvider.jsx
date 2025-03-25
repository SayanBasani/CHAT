import { createContext, useEffect, useState } from "react";
import { getAllContect } from "./Account";
export const AllStorage = createContext();

export default function StorageProvider({ children }) {
  const [userData, setuserData] = useState(() => {
    const isUser = localStorage.getItem('user');
    return isUser ? JSON.parse(isUser) : null;
  });
  const [allContectS, setallContectS] = useState(null);

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
        console.log("complet");
      } catch (error) {
        console.log("error is occer");
        console.error(error);
      }
    })();;
  }, [, userData])

  return (
    <AllStorage.Provider value={{
      userData, setuserData, chatSidebarOptions, allContectS, setallContectS
    }}>
      {children}
    </AllStorage.Provider>
  )
};
