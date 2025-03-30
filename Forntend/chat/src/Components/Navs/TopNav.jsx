import { Link, NavLink } from "react-router"
import NavDropdown from "./NavDropdown"
import { useEffect, useRef, useState } from "react";
import DarkToggle from "../Buttons/DarkToggle";

export default function TopNav() {
  const [DropDown, setDropDown] = useState(false);
  const [topNavDropDown, settopNavDropDown] = useState(false);
  const topNavDropDownMenu = useRef();
  const topNavDropDownBtn = useRef();
  function hableDropDown() {
    settopNavDropDown(!topNavDropDown);
  }


  useEffect(() => {
    document.addEventListener("click", (event) => {
      // console.log(event.contains);

      handleClickOutside(event)
    })

  }, [])
  function handleClickOutside(e) {
    if (topNavDropDownMenu.current.contains(e.target) || topNavDropDownBtn.current.contains(e.target)) {
    } else {
      settopNavDropDown(false)
    }
    console.log(e);
    // if(e.tar)
  }

  return <>
    <div>
      <nav className="darkTopNav p-3 bg-[rgb(246,247,247)] h-14 grid grid-cols-[1fr_18fr_1fr] items-center ">
        <NavLink className="flex justify-center" to={'/'}>
          <i className="bi bi-house text-2xl"></i>
        </NavLink>
        <div className="m-auto w-full flex items-center justify-center">
          <input className="h-8 border-l-[1.5px] border-y rounded-l-lg px-4 py-1 w-[70%] max-w-[550px]" placeholder="Search" type="text" />
          <button className="h-8 cursor-pointer p-2 border-y border-r-[1.5px] rounded-r-lg flex justify-center items-center"><i className="bi bi-search"></i></button>
        </div>

        <button ref={topNavDropDownBtn} className="bi bi-list text-2xl" onClick={(e) => {
          hableDropDown(e);
        }}>
        </button>
      </nav>
      <div ref={topNavDropDownMenu} className={`${topNavDropDown ? "" : "hidden"} dropDownManu absolute top-14 right-10`}>
        <NavDropdown />
      </div>
    </div>
    <div className="absolute bottom-5 right-5">
      <DarkToggle />{/* Darktogel Button */}
    </div>
  </>
};
