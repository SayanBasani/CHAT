import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
export default function Setting(params) {
  const on_off_btnref = useRef();
  const on_off_optsref = useRef();
  useEffect(() => {
    document.addEventListener("click", handleon_off_opt);
    return () => {
      document.removeEventListener("click", handleon_off_opt);
    }
  }, []);
  const handleon_off_opt = (event) => {
    if (on_off_btnref.current && on_off_btnref.current.contains(event.target)) {
      on_off_optsref.current.classList.toggle('hidden');
    }
  }
  return (<>
    <div className=" m-2 gap-[3px] grid">
      <span className="text-3xl font-semibold">Settings</span>
      <div className="m-2 lg:mx-20 p-1 gap-[3px] grid ">
        <Link to={"/profile"} className="rounded-xl transition-transform block px-4 py-2 hover:scale-105 hover:border hover:border-[rgb(132,154,163)] text-xl">profile</Link>
        <Link to={"/Theme"} className="rounded-xl transition-transform block px-4 py-2 hover:scale-105 hover:border hover:border-[rgb(132,154,163)] text-xl">Theme</Link>
        <div className="gap-3 rounded-xl transition-transform grid px-4 py-2 hover:border-[rgb(132,154,163)] text-xl">
          <span ref={on_off_btnref} className="cursor-pointer">
            Security
          </span>
          {/* <ul className="rounded-xl transition-transform block px-4 py-2 hover:scale-105 hover:border hover:border-[rgb(132,154,163)] text-xl"> */}
          <ul ref={on_off_optsref} className="px-2 pl-4 hidden ">
            <li className="text-style-hover transition-transform">
              <Link to={"/profile"} className="">Password</Link>
            </li>
            <li className="text-style-hover transition-transform">
              <Link to={"/profile"} className="">Local Password</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>)
};
