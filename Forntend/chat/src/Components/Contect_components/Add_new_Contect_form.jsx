import { useForm } from "react-hook-form";
import { addContect, getAllContect } from "../../Storage/Account";
import { useContext, useEffect, useRef } from "react";
import { AllStorage } from "../../Storage/StorageProvider";
export default function Add_new_Contect_form() {
  const {setallContectS} = useContext(AllStorage);
  const { handleSubmit, register, formState: { errors }, } = useForm();
  const addContectBodyRef = useRef();
  const addContectFormRef = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (
        addContectBodyRef.current &&
        addContectBodyRef.current.contains(event.target) &&
        addContectFormRef.current &&
        addContectFormRef.current.contains(event.target)
      ) {
        // Click inside; do nothing
        return;
      } else if (addContectBodyRef.current) {
        // Click outside; hide the form
        addContectBodyRef.current.classList.add("hidden");
      }
    };
  
    // Use the correct class selector
    const element = document.querySelector('.addNewContect');
    if (element) {
      element.addEventListener("click", handleClick);
    }
  
    return () => {
      if (element) {
        element.removeEventListener("click", handleClick);
      }
    };
  }, []);

  const onSubmit = async (data) => {

    const response = await addContect(data);

    console.log("Response data:", response);
    if (response.contectCreated) {
      console.log("contect is created");

      // try to update the contects 
      try {
        let responseAllContect = await getAllContect();
        if (responseAllContect.allContecet) {
          setallContectS(responseAllContect.allContecet);
        } else {
          console.log("no response res");
        }
        // console.log("complet");
      } catch (error) {
        console.log("error is occer");
        console.error(error);
      }
    }
    if (response.message) {
      alert(response.message)
    }
  }
  return (<>
    <div ref={addContectBodyRef} className="bg-white/0 backdrop-blur-sm addNewContect hidden Add_new_Contect_form justify-center items-center absolute top-0 left-0 w-full h-full flex">
      <form ref={addContectFormRef} onSubmit={handleSubmit(onSubmit)} className="contect_form darkTopNav m-auto  grid w-80 max-sm:w-60 max-sm:p-5 p-10 bg-gray-100 rounded-2xl gap-5">
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
