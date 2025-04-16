import {Link} from "react-router";
import { LogOut } from "../../Storage/Account";
import { useContext } from "react";
import { AllStorage } from "../../Storage/StorageProvider";
export default function NavDropdown() {
  const {userData, setuserData} = useContext(AllStorage);  
  return (
  <>
    <div className="darkTopNav border grid w-50 py-3 px-5 rounded-lg transition duration-500 ease-linear">
      <Link to={'/Home'} className="hover:bg-gray-200  hover:text-black p-1 flex justify-center rounded-md w-full hover:bg-[rgb(238,235,235)]">Home</Link>
      <Link to={'/Chat'} className="hover:bg-gray-200  hover:text-black p-1 flex justify-center rounded-md w-full">Chat</Link>
      
      <Link to={'/Singup'} className="hover:bg-gray-200  hover:text-black p-1 flex justify-center rounded-md w-full ">Create Account</Link>
      <Link className="hover:bg-gray-200  hover:text-black p-1 flex justify-center rounded-md w-full">About Us</Link>
      <Link className="hover:bg-gray-200  hover:text-black p-1 flex justify-center rounded-md w-full">Connect With Us</Link>
      <Link className="hover:bg-gray-200  hover:text-black p-1 flex justify-center rounded-md w-full">Help</Link>
      {userData ? 
      <div  className="hover:bg-gray-200  hover:text-black p-1 flex justify-center rounded-md w-full "><LogOut/></div>
      :
      <Link to={'/Login'} className="hover:bg-gray-200  hover:text-black p-1 flex justify-center rounded-md w-full">Login</Link>
      }
    </div>
  </>
  )
};
