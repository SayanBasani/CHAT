import React, { useRef, useState } from 'react'

function PopupEditProfileData({ field, userPData }) {
  const [opData ,setOpData] = useState();
  const hideEditFieldRef = useRef()
  const hideEditField = ()=>{
    hideEditFieldRef.current.classList.toggle("hidden")
  }
  const handleEditFields = () => {
    hideEditFieldRef.current.classList.toggle("hidden")
    const nField = field.toLowerCase();
    if(nField === "name"){
      setOpData(userPData.user_name);
    }
    else if(nField === "email"){
      setOpData(userPData.user_email);
    }
    else if(nField === "phone"){
      setOpData(userPData.user_ph_no);
    }
    console.log(opData);
  }
  return (
    <>
      <button onClick={handleEditFields} className='bi bi-pen cursor-pointer'></button>
      <div ref={hideEditFieldRef} className='hidden flex justify-center items-center absolute top-0 left-0 w-full h-full bg-white/0 backdrop-blur-sm'>
        <div className='cardBoxText shadowBox max-sm:w-65 items-center  w-80 p-6 rounded-lg shadow-lg flex flex-col gap-5'>
          <button onClick={hideEditField} className='text-2xl bi bi-x absolute top-10 right-10'></button>
          <label className='p-2 rounded-md border border-[rgb(83,83,83)] text-xl grid justify-start' htmlFor="">
            {field}
            <input defaultValue={opData} className='focus:outline-none' type="text" />
          </label>
          <button className='w-fit px-5 py-1 rounded-md bg-[rgb(50,200,223)]'>Save</button>
        </div>
      </div>
    </>
  )
}

export default PopupEditProfileData
