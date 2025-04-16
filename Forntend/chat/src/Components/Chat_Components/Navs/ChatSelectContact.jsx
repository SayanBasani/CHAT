import React, { useContext } from 'react'
import { AllStorage } from '../../../Storage/StorageProvider';
import { Link } from 'react-router';
import Add_new_Contect_form from '../../Contect_components/Add_new_Contect_form';
import Add_New_Contect_Button from "../../Contect_components/Add_New_Contect_Button";


function ChatSelectContact() {
  const { allContectS } = useContext(AllStorage);
  return (
    <ul className='p-2 w-42 grid gap-2'>
      {allContectS ?
        allContectS.map((contact, index) =>
        (
          <li title={`${contact.phoneNumber}`} key={index} className='border text-style-hover transition-transform cursor-pointer'>
            <Link to={`/Chat/${contact.phoneNumber}`} className="justify-center items-center flex">
              {contact.ContactName}
            </Link>
          </li>
        )
        )
        :
        (
          <li className='font-semibold text-style-hover transition-transform cursor-pointer'>
            No Contect Found
          </li>
        )
      }
    </ul>
  )
}

export default ChatSelectContact
