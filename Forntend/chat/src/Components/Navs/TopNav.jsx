import {Link,NavLink} from "react-router"
import NavDropdown from "./NavDropdown"
import { useState } from "react";
import DarkToggle from "../Buttons/DarkToggle";

export default function TopNav() {
  const [ DropDown,setDropDown ] = useState(false);
  function hableDropDown(e) {
      // console.log("---",e);
      const dropDownManu = document.querySelector(".dropDownManu");
      dropDownManu.classList.toggle("hidden");
      console.log(dropDownManu);
      
  }
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };
  return <>
  <div>
    <nav className="darkTopNav p-3 bg-[rgb(246,247,247)] h-14 grid grid-cols-[1fr_18fr_1fr_1fr] items-center ">
      <NavLink className="flex justify-center" to={'/'}>
        <i className="bi bi-house text-2xl"></i>
      </NavLink>
      <div className="m-auto w-full flex items-center justify-center">
        <input className="h-8 border-l-[1.5px] border-y rounded-l-lg px-4 py-1 w-[70%] max-w-[550px]" placeholder="Search" type="text" />
        <button className="h-8 cursor-pointer p-2 border-y border-r-[1.5px] rounded-r-lg flex justify-center items-center"><i className="bi bi-search"></i></button>
      </div>
      <div>
        <DarkToggle/>{/* Darktogel Button */}
      </div>
      <button className="bi bi-list text-2xl" onClick={(e)=>{
        hableDropDown(e);
      }}>
      </button>
    </nav>
      <div className="hidden dropDownManu absolute top-14 right-10">
        <NavDropdown/>
      </div>
  </div>
  </>
};
