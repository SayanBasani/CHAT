import TopNav from "../Components/Navs/TopNav";
import {Link} from "react-router";

export default function Dashbord(){
  return <>
  <div>
    <TopNav/>
    
    <div className="flex gap-10 mt-10 m-auto justify-center">
      <Link to={'/Login'} className="bg-blue-500 px-4 py-2 rounded-lg">Login</Link>
      <Link to={'/Singup'} className="bg-blue-500 px-4 py-2 rounded-lg">Sing Up</Link>
    </div>
  </div>
  </>
}