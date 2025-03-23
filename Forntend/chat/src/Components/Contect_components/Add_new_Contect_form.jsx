import { useForm } from "react-hook-form";
import { addContect } from "../../Storage/Account";
export default function Add_new_Contect_form(params) {


  const { handleSubmit, register, formState: { errors }, } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log("add a contect btn");
    const response = await addContect(data);

    console.log("Response data:", response);
    if(response.contectCreated){
      console.log("contect is created");
    }
  }
  return (<>
    <div className="hidden Add_new_Contect_form justify-center items-center z-10 absolute top-0 left-0 w-full h-full flex border">
      <form onSubmit={handleSubmit(onSubmit)} className="contect_form darkExtraPage m-auto  grid w-80 max-sm:w-60 max-sm:p-5 p-10 bg-gray-100 rounded-2xl gap-5">
        <h1 className="text-2xl m-auto">Add Contects</h1>
        {/* <label htmlFor="" className="grid border rounded-xl p-1"> */}
        <label htmlFor="" className={`${errors.ContactName && "text-red-700 border-2"} grid border rounded-xl p-1`}>
          Name :
          <input {...register("ContactName", { required: true })} placeholder="Enter Name" className="" type="text" />
        </label>

        <label htmlFor="" className={`${errors.phoneNumber && "text-red-700 border-2"} grid border rounded-xl p-1`}>
          Phone Number :
          <input {...register("phoneNumber", { required: true })} placeholder="Enter Number" className="" type="text" />
        </label>
        <label htmlFor="" className="grid border rounded-xl p-1">
          Email :
          <input {...register("ContactEmail")} placeholder="Enter Email" className="" type="text" />
        </label>

        <button className="bg-blue-600 m-auto px-3 py-1 rounded-md hover:bg-blue-700">Add</button>

      </form>
    </div>
  </>)
};
