import { createContext, useEffect, useState } from "react";
export const AllStorage = createContext();

export default function StorageProvider({children}) {
  const [userData , setuserData] = useState();
  const chatSidebarOptions = [
    {'name':'Chat','icon_name':'bi-chat'},
    {'name':'Contects','icon_name':'bi-person'},
    {'name':'Call','icon_name':'bi-telephone'},
  ]
  useEffect(()=>{
    let isUser = localStorage.getItem('user');
    console.log('this is the st',isUser);
    let a = JSON.parse(isUser)
    console.log(a.user_email);
    console.log(a);

  },[userData])
  return(
    <AllStorage.Provider value={[
      userData,setuserData,chatSidebarOptions,
      ]}>
      {children}
    </AllStorage.Provider>
  )
};
