import React, { useCallback, useEffect, useState } from 'react'
import { getAllChatContacts } from '../../Storage/ApiRequest';
import { Link } from "react-router-dom"
function ChatOldMessages() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await getAllChatContacts();

      if (response.error) {
        setError(response.message);
      } else {
        setContacts(response.contacts || []); // Assuming the backend returns a `contacts` array
      }
    };

    fetchContacts();
  }, []);
  const handleContacts = useCallback(async () => {
    const response = await getAllChatContacts();
    console.log({ response });
    if (response.error) {
      setError(response.message);
    } else {
      setContacts(response.contacts || []); // Assuming the backend returns a `contacts` array
    }
  }, [])
  useEffect(() => {
    // console.log("contacts-->", contacts);
  }, [contacts])
  return (
    <div className='h-full gap-1 p-10'>
      {/* <button className='sticky w-fit h-fit text-2xl bg-blue-400 rounded-md' onClick={() => {handleContacts();}}>get</button> */}
      {
        contacts && contacts.length > 0 ? (contacts.map((chat) => {
          const { contactId, lastMessageTime, contactDetails } = chat;
          const { user_email, user_id, user_name, user_ph_no } = contactDetails;
          return (<>
            {/* <Link to={``} className='h-fit'> */}
            <Link to={`/Chat/${user_ph_no}`} className="items-center m-3 transition-transform hover:scale-105 grid grid-cols-[50px_1fr_50px] h-18 rounded-md">
              <i className="flex justify-center items-center rounded-sm profile_btn bi bi-person-circle text-3xl cursor-pointer"></i>
              <div className='grid'>
                <span className='text-xl font-semibold'>{user_name}</span>
                <p  className=' flex justify-between '><span>{user_ph_no}</span><span> {lastMessageTime}</span></p>
              </div>
              <i className="flex justify-center items-center rounded-sm bi bi-three-dots-vertical cursor-pointer"></i>
            </Link>
          </>)
        })
        ) : ("No Users")
      }
    </div>
  )
}

export default ChatOldMessages
