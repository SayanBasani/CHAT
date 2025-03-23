
export default function Chat_recive({items,sender_name,message}) {
  
  
  return (
    <>

      <div className={``}>
        <div className="justify-start flex">

          <div className="flex items-start gap-2.5">
            {/* <img class="w-8 h-8 rounded-full" src="" alt="Jese image" /> */}
            <div className="flex justify-center items-center rounded-full w-8 h-8">
              <i className="bi bi-person-circle text-2xl flex justify-center items-center"></i>
            </div>
            <div className="flex flex-col gap-1 w-full max-w-[320px]">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold ">
                  {sender_name}
                </span>
                <span className="text-sm font-normal">{message.seen_time}</span>
              </div>
              <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <p className="text-sm font-normal break-words text-gray-900 dark:text-white">
                  {message.message}
                </p>
              </div>
              {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> */}
              {/* <div>
              <i className="bi bi-check2-all"></i>
              <i className="bi bi-check2"></i>
            </div> */}
            </div>
          </div>
        </div>




      </div>
    </>
  )
}