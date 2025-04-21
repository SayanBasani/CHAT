import { Link, Navigate, useNavigate } from "react-router";
import TopNav from "../../Components/Navs/TopNav";
import { useForm } from "react-hook-form";
import { createUser } from "../../Storage/Account";
import { useState } from "react";
import { Mosaic } from "react-loading-indicators"

export default function Singup(params) {
  const [reqLoginlogin, setreqLoginlogin] = useState(false)
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { error } } = useForm();
  const onSubmit = async (data) => {
    setreqLoginlogin(true);
    console.log(data);
    const response = await createUser(data);
    console.log(response);
    console.log(response['error message']);

    if (response['error message']) {
      setreqLoginlogin(false);
      alert(response['error message']);
    } else if (response.error) {
      setreqLoginlogin(false);
      alert(response.error);
    } else {
      setreqLoginlogin(false);
      alert("successfully account is created");
      navigate("/Login");
    }
  }
  return (
    <>
      <div className="">
        <TopNav />
        <div className={`${reqLoginlogin ? "grid" : "hidden"} backdrop-blur-sm absolute w-screen h-screen z-40 items-center justify-center `}>
          <Mosaic color="rgb(15, 191, 255)" size="medium" text="" textColor="" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden darkExtraPage mx-auto m-20 grid w-80 max-sm:w-60 max-sm:p-5 p-10 bg-gray-200 rounded-2xl gap-5">
          {/* {user_name: '46', user_email: '44646@g', user_ph_no: '44', user_password: '6464'} */}
          <h1 className="text-4xl m-auto">Singup</h1>
          <label htmlFor="" className="overflow-hidden grid border rounded-xl p-1">
            Name
            <input {...register("user_name")} placeholder="Enter Full Name" className="max-w-[80%]" type="text" />
          </label>
          <label htmlFor="" className="overflow-hidden grid border rounded-xl p-1">
            Email
            <input {...register("user_email")} placeholder="Enter Email" className="max-w-[80%]" type="email" />
          </label>
          <label htmlFor="" className="overflow-hidden grid border rounded-xl p-1">
            Mobile Number
            <input {...register("user_ph_no")} placeholder="Enter Mobile Number" className="max-w-[80%]" type="number" />
          </label>
          <label htmlFor="" className="overflow-hidden grid border rounded-xl p-1" >
            Password
            <input {...register("user_password")} placeholder="Password" className="max-w-[80%]" type="text" />
          </label>
          <button className="bg-blue-600 m-auto px-3 py-1 rounded-md hover:bg-blue-700">Singup</button>
          <span> already have an account ? <Link to={'/Login'} className="underline hover:text-blue-500">Login</Link></span>
        </form>
      </div>
    </>
  )
};
