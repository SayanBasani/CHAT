export default function ChatMessagesBox(params) {
  return (<>
    <div className="w-full px-2 pb-1">
      <div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">
        <div className="flex items-center gap-2">
          <i className="bi bi-person-circle text-xl"></i>
          <input className="grow shrink basis-0 text-black text-x font-medium leading-4 focus:outline-none" placeholder="Type here..." />
        </div>
        <div className="flex items-center gap-2">
          <i className="bi bi-paperclip text-xl rotate-45"></i>
          <button className="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow ">
            <i className="bi bi-send text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  </>)
};
