import { createContext, useEffect, useState } from "react";
export const AllStorage = createContext();

export default function StorageProvider({ children }) {
  const [userData, setuserData] = useState(()=>{
    const isUser = localStorage.getItem('user');
    return isUser ? JSON.parse(isUser) : null;
  });
  
  const chatSidebarOptions = [
    { 'name': 'Chat', 'icon_name': 'bi-chat' },
    { 'name': 'Contects', 'icon_name': 'bi-person' },
    { 'name': 'Call', 'icon_name': 'bi-telephone' },
  ]
  

  return (
    <AllStorage.Provider value={{
      userData, setuserData, chatSidebarOptions
    }}>
      {children}
    </AllStorage.Provider>
  )
};
