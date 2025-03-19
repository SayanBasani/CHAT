
export default function Chat_send({ items }) {

  return (
    <>
      <div className={``}>
        <div className="justify-end flex">
          <div className="flex items-start gap-2.5">

            <div className="flex flex-col gap-1 w-full max-w-[320px]">
              <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end">
                <span className="text-sm font-normal ">Date Tyme</span>
                <span className="text-sm font-semibold">You</span>
              </div>
              <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-b-xl rounded-s-xl dark:bg-gray-700">
                <p className="text-sm font-normal break-words text-gray-900 dark:text-white">
                  Your message
                </p>
              </div>
              {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> */}
              <div>
                {/* <i className="bi bi-check2-all"></i>
                <i className="bi bi-check2"></i> */}
              </div>
            </div>
            {/* <img className="w-8 h-8 rounded-full" src="" alt="Jese image" /> */}
            <div className="flex justify-center items-center rounded-full w-8 h-8">
              <i className="bi bi-person-circle text-2xl flex justify-center items-center"></i>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}