import React, { useCallback, useContext, useEffect } from 'react';
import { AllStorage } from "../../Storage/StorageProvider.jsx"
import { Link, useNavigate } from 'react-router';
import { getUserData } from '../../Storage/ApiRequest.jsx';
import { LogOut } from '../../Storage/Account.jsx';
import PopupEditProfileData from '../../Components/Chat_Components/EditUserData/PopupEditProfileData.jsx';
function Profile() {
  const { userData, userPData, setuserPData } = useContext(AllStorage);
  const navigate = useNavigate();

  if (!userData) {
    navigate("/Login");
  }
  useEffect(() => {
    if (!userData) {
      console.error("userData is null or undefined");
      return;
    }

    (async () => {
      const response = await getUserData(userData);
      setuserPData(response);
      
    })();
  }, [userData]);

  return (
    // bg-gray-100
    <div className='flex justify-center items-center w-full h-full overflow-auto '>

      <div className='cardBoxText shadowBox max-sm:w-65  w-80 p-6 rounded-lg shadow-lg flex flex-col items-center gap-5'>
        {/* Profile Picture */}
        <div className='w-24 h-24 rounded-full overflow-hidden bg-amber-200 flex justify-center items-center'>
          <img className='w-full h-full object-cover' src='https://sayanbasani.github.io/SayanBasani/sayan.jpg' alt='Profile Pic' />
        </div>

        {/* Name Display */}
        <div className='w-full grid gap-3'>

          <div className='w-full gap-3 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <i class="bi bi-person text-2xl"></i>
              <div>
                <label className='block text-gray-500 font-semibold mb-1'>Name</label>
                <div className='w-full rounded-md  font-normal'>
                  {userPData ? userPData.user_name : ""}
                </div>
              </div>
            </div>
            {/* <button onClick={handleEditFields()} className='bi bi-pen'></button> */}
            <PopupEditProfileData field={"Name"} userPData={userPData} />
          </div>

          <div className='w-full gap-3 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <i class="bi bi-envelope text-2xl"></i>
              <div>
                <label className='block text-gray-500 font-semibold mb-1'>Email</label>
                <div className='w-full rounded-md font-normal'>
                  {userPData ? userPData.user_email : ""}
                </div>
              </div>
            </div>
            <PopupEditProfileData field={"Email"} userPData={userPData} />
          </div>

          <div className='w-full gap-3 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <i class="bi bi-telephone text-2xl"></i>
              <div>
                <label className='block text-gray-500 font-semibold mb-1'>Phone</label>
                <div className='w-full rounded-md font-normal'>
                  {userPData ? userPData.user_ph_no : ""}
                </div>
              </div>
            </div>
            <PopupEditProfileData field={"Phone"} userPData={userPData} />
          </div>

          <div className='w-full gap-3 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <i class="bi bi-card-text text-2xl"></i>
              <div>
                <label className='block text-gray-500 font-semibold mb-1'>about</label>
                <div className='w-full rounded-md font-normal'>
                  There is Nothing about me
                </div>
              </div>
            </div>
            <button className='bi bi-pen'></button>
          </div>


          <div className='rounded-md flex justify-center overflow-hidden mt-3'>
            <button className='px-5 py-1 h-full bg-[rgb(255,43,43)] rounded-md'>
              <LogOut />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
