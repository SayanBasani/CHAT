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
  const [userData, setuserData] = useState(async () => {});
  const [allContectS, setallContectS] = useState(null);
  const [chatSideNavwidth,setchatSideNavwidth]=useState(false);
  const [messageLoading,setMessageLoading]=useState(false);
  const [userPData,setuserPData]=useState(null);
  const [_mainbarColor,setmainbarColor]=useState(null);
  const [_bgColor,setbgColor]=useState(null);
  const [_fontColor,setfontColor]=useState(null);

  const chatSidebarOptions = [{ 'name': 'Chat', 'icon_name': 'bi-chat' },{ 'name': 'Contects', 'icon_name': 'bi-person' },{ 'name': 'Call', 'icon_name': 'bi-telephone' },]

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

  useEffect(()=>{
    setmainbarColor(()=>{
      return localStorage.getItem("mainbarColor")
    });
    setbgColor(()=>{
      return localStorage.getItem("bgColor")
    });
  },[])
  useEffect(() => {
    console.log("changed color is :->",_mainbarColor);
    document.documentElement.style.setProperty('--mainbar-bg', _mainbarColor);
  }, [_mainbarColor]);
  useEffect(() => {
    console.log("changed color is :->",_bgColor);
    document.documentElement.style.setProperty('--body-bg', _bgColor);
  }, [_bgColor]);
  useEffect(() => {
    console.log("text color is :->",_fontColor);
    document.documentElement.style.setProperty('--font-color', _fontColor);
  }, [_fontColor]);
  
  return (
    <AllStorage.Provider value={{
      userData, setuserData, chatSidebarOptions, allContectS, setallContectS,
      chatSideNavwidth,setchatSideNavwidth,messageLoading,setMessageLoading,
      userPData,setuserPData,_bgColor,setbgColor,_mainbarColor,setmainbarColor,
      _fontColor,setfontColor,
    }}>
      {children}
    </AllStorage.Provider>
  )
};
