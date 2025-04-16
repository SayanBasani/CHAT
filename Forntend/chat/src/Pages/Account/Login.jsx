import { Link, useNavigate } from "react-router";
import TopNav from "../../Components/Navs/TopNav";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AllStorage } from "../../Storage/StorageProvider";
import { loginUser } from "../../Storage/Account";
import { Mosaic } from "react-loading-indicators"
export default function Login(params) {
  const [reqLoginlogin, setreqLoginlogin] = useState(false)
  // console.log('from login --> ', localStorage.getItem('user'));

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { error } } = useForm();
  const { setuserData } = useContext(AllStorage);
  const onSubmit = async (data) => {
    setreqLoginlogin(true);
    const response = await loginUser(data)

    if (response.error) {
      setreqLoginlogin(false);
      alert(response.error);
    } else {
      setreqLoginlogin(false);
      if (response.login) {
        setreqLoginlogin(false);
        // console.log("login response -->",response,"<---response!!");
        setuserData(response.user);
        // localStorage.setItem('user',JSON.stringify(response.user));
        navigate('/');
      } else {
        setreqLoginlogin(false);
        alert('Try With Correct Credincils!');
        // localStorage.setItem('user', JSON.stringify({}))
      }
    }

  }
  return (
    <>
      <div className="">
        <TopNav />
        <div className={`${reqLoginlogin ? "grid" : "hidden"} backdrop-blur-sm absolute w-screen h-screen z-40 items-center justify-center `}>
          <Mosaic color="rgb(15, 191, 255)" size="medium" text="" textColor="" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="darkExtraPage m-auto mt-40 grid w-80 max-sm:w-60 max-sm:p-5 p-10 bg-gray-100 rounded-2xl gap-5">

          <h1 className="text-4xl m-auto">Login</h1>
          <label htmlFor="" className="grid border rounded-xl p-1">
            Email :
            <input {...register("user_email")} placeholder="Enter Email" className="" type="text" />
          </label>
          <label htmlFor="" className="grid border rounded-xl p-1" >
            Password :
            <input {...register("user_password")} placeholder="Password" className="" type="text" />
          </label>
          <button className="bg-blue-600 m-auto px-3 py-1 rounded-md hover:bg-blue-700">Login</button>
          <span> I don't have an Account <Link to={'/Singup'} className="hover:text-blue-600 underline">SingUp</Link></span>

        </form>
      </div>
    </>
  )
};
