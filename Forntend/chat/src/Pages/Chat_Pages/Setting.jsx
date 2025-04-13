import { Link } from "react-router-dom"
export default function Setting(params) {
  return (<>
    <div className=" m-2 gap-[3px] grid">
      <span className="text-3xl font-semibold">Settings</span>
      <div className="m-2 lg:mx-20 p-1 gap-[3px] grid ">
        <Link to={"/profile"} className="rounded-xl transition-transform block px-4 py-2 hover:scale-105 hover:border hover:border-[rgb(132,154,163)] text-xl">profile</Link>
        <Link to={"/profile"} className="rounded-xl transition-transform block px-4 py-2 hover:scale-105 hover:border hover:border-[rgb(132,154,163)] text-xl">Theme</Link>
        <Link to={"/profile"} className="rounded-xl transition-transform block px-4 py-2 hover:scale-105 hover:border hover:border-[rgb(132,154,163)] text-xl">Password</Link>
        <Link to={"/profile"} className="rounded-xl transition-transform block px-4 py-2 hover:scale-105 hover:border hover:border-[rgb(132,154,163)] text-xl">Local Lock</Link>
      </div>
    </div>
  </>)
};
