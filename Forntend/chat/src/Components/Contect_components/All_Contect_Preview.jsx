export default function All_Contect_Preview(params) {
  return (<>
    <div class="w-full max-w-screen-xl mx-auto p-6">

      <div class="mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
        <div class="sm:flex sm:items-center px-2 py-4">
          <div class="flex-grow">
            <h3 class="font-normal px-2 py-3 leading-tight">Contacts</h3>
            <input type="text" placeholder="Search " class="my-2 w-full text-sm bg-grey-light text-grey-darkest rounded h-10 p-3 focus:outline-none" />

            <div class="w-full c">

              <div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                <div class="w-8 h-10 text-center py-1">
                  {/* <i className="bi bi-dot text-3xl p-0 text-green-400"></i> */}
                  <i className="bi bi-dot text-3xl p-0 text-red-500"></i>
                </div>
                <div class="w-4/5 h-10 py-3 px-1 grid grid-cols-[1fr_1fr]">
                  <p class="hover:text-blue-dark ">Kevin Durant 654564654</p>
                  <p class="hover:text-blue-dark">9735154080</p>
                </div>
                <div class="w-1/5 h-10 text-right p-3">
                  <p class="text-sm text-grey-dark">Member</p>
                </div>
              </div>


              <div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                <div class="w-8 h-10 text-center py-1">
                  {/* <i className="bi bi-dot text-3xl p-0 text-green-400"></i> */}
                  <i className="bi bi-dot text-3xl p-0 text-red-500"></i>
                </div>
                <div class="w-4/5 h-10 py-3 px-1">
                  <p class="hover:text-blue-dark">Kevin Durant</p>
                  <p class="hover:text-blue-dark">Kevin Durant</p>
                </div>
                <div class="w-1/5 h-10 text-right p-3">
                  <p class="text-sm text-grey-dark">Member</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </>)
};
