import {Link} from "react-router";
export default function NavDropdown() {
  return (
  <>
    <div className="border grid w-50 py-3 px-5 rounded-lg transition duration-500 ease-linear">
      <Link to={'/Home'} className="p-1 flex justify-center rounded-md w-full hover:bg-[rgb(238,235,235)]">Home</Link>
      <Link to={'/Chat'} className="p-1 flex justify-center rounded-md w-full hover:bg-[rgb(238,235,235)]">Chat</Link>
      <Link to={'/Login'} className="p-1 flex justify-center rounded-md w-full hover:bg-[rgb(238,235,235)]">Login</Link>
      <Link to={'/Singup'} className="p-1 flex justify-center rounded-md w-full hover:bg-[rgb(238,235,235)]">Create Account</Link>
      <Link className="p-1 flex justify-center rounded-md w-full hover:bg-[rgb(238,235,235)]">About Us</Link>
      <Link className="p-1 flex justify-center rounded-md w-full hover:bg-[rgb(238,235,235)]">Connect With Us</Link>
      <Link className="p-1 flex justify-center rounded-md w-full hover:bg-[rgb(238,235,235)]">Help</Link>
    </div>
  </>
  )
};
