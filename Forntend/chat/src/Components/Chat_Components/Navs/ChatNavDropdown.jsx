import {Link, NavLink} from "react-router-dom"
export default function ChatNavDropdown() {
  return (
    <div className="darkExtraPage border grid w-[200px] py-3 px-5 rounded-lg transition duration-500 ease-linear">
      <NavLink to={"/Login"} className="p-2 flex justify-center rounded-md w-full hover:bg-gray-400 hover:text-black">
        Login/Signup
      </NavLink>
      <NavLink to="/Home" className="p-2 flex justify-center rounded-md w-full hover:bg-gray-200  hover:text-black">
        Home
      </NavLink>
      <NavLink to="/Setting" className="p-2 flex justify-center rounded-md w-full hover:bg-gray-200  hover:text-black">
        Setting
      </NavLink>
      <NavLink to="/Singup" className="p-2 flex justify-center rounded-md w-full hover:bg-gray-200  hover:text-black">
        Create Account
      </NavLink>
      <NavLink to="/AboutUs" className="p-2 flex justify-center rounded-md w-full hover:bg-gray-200  hover:text-black">
        About Us
      </NavLink>
      <NavLink to="/Connect" className="p-2 flex justify-center rounded-md w-full hover:bg-gray-200  hover:text-black">
        Connect With Us
      </NavLink>
      <NavLink to="/Help" className="p-2 flex justify-center rounded-md w-full hover:bg-gray-200  hover:text-black">
        Help
      </NavLink>
    </div>
  );
}
