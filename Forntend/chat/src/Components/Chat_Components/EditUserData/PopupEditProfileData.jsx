import React, { useContext, useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { getUserData, updateUserData } from '../../../Storage/ApiRequest';
import { AllStorage } from '../../../Storage/StorageProvider';

function PopupEditProfileData({ field, userPData }) {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm()
  const { userData, setuserData, setuserPData } = useContext(AllStorage)
  const [opData, setOpData] = useState();
  const hideEditFieldRef = useRef()
  const nField = field.toLowerCase();

  const hideEditField = () => { hideEditFieldRef.current.classList.toggle("hidden") }
  const handleEditFields = () => {
    hideEditFieldRef.current.classList.toggle("hidden")
    if (nField === "name") {
      setOpData(userPData.user_name);
    }
    else if (nField === "email") {
      setOpData(userPData.user_email);
    }
    else if (nField === "phone") {
      setOpData(userPData.user_ph_no);
    }
    console.log(opData);
  }
  const onSubmit = async (data) => {
    data.field = nField;
    const response = await updateUserData(data);
    console.log(response)
    ;;
    (async () => {
      const response = await getUserData(userData);
      setuserPData(response);
    })()
    ;
    hideEditField();
  }
  return (
    <>
      <button onClick={handleEditFields} className='bi bi-pen cursor-pointer'></button>
      <div ref={hideEditFieldRef} className='editProfileVal hidden flex justify-center items-center absolute top-0 left-0 w-full h-full bg-white/0 backdrop-blur-sm'>
        <button onClick={hideEditField} className='text-2xl bi bi-x absolute top-10 right-10'></button>
        <form onSubmit={handleSubmit(onSubmit)} className='cardBoxText shadowBox max-sm:w-65 items-center  w-80 p-6 rounded-lg shadow-lg flex flex-col gap-5'>
          <label className='p-2 rounded-md border border-[rgb(83,83,83)] text-xl grid justify-start' htmlFor="">
            {field}
            <input {...register("newValue", { required: true, maxLength: "40" })} defaultValue={opData} className={`${errors.changeValue ? "border-red-500" : ""} focus:outline-none`} type="text" />
            {errors.newValue && (
              <span className="text-red-500">This field is required</span>
            )}
          </label>
          <button className='cursor-pointer w-fit px-5 py-1 rounded-md bg-[rgb(50,200,223)]'>Save</button>
        </form>
      </div>
    </>
  )
}

export default PopupEditProfileData
