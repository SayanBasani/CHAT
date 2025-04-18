import { useContext, useEffect, useRef, useState } from "react";
import { AllStorage } from "../../Storage/StorageProvider";
import { getAllContect } from "../../Storage/Account";
import ThreeDotContectOpt from "./ThreeDotContectOpt";
import { Link } from "react-router-dom";
import SocketProvider, { SocketContext } from "../../Storage/Sockets";

export default function All_Contect_Preview(params) {
  const threeDotOpt = useRef();
  const { allContectS, setallContectS } = useContext(AllStorage);
  const { socket, trackOnline, settrackOnline } = useContext(SocketContext);
  const [activeContactIndex, setActiveContactIndex] = useState(null); // State to track which contact's options are open

  const menuRef = useRef(null);
  const buttonRefs = useRef([]);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeContactIndex]);

  function handleClickOutside(event) {
    if (
      menuRef.current && !menuRef.current.contains(event.target) &&
      !buttonRefs.current.some((btn) => btn && btn.contains(event.target))
    ) {
      setActiveContactIndex(null);
    }
  }


  const handleGetAllContectRequest = async () => {
    console.log(allContectS);
    try {
      let responseAllContect = await getAllContect();
      if (responseAllContect.allContecet) {
        setallContectS(responseAllContect.allContecet);
        console.log("Updating the Contacts");
      } else {
        console.log("No response received");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleThreeDotClick = (index) => {
    // Toggle the visibility of the options for the clicked contact
    setActiveContactIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // for track which contect are online and ofline 
  // useEffect(() => {
  //   try {

  //     if (!allContectS || !socket) { return; }
  //     const listeners = [];
  //     allContectS.forEach(element => {
  //       if (!element.phoneNumber) { return; }
  //       const contectPhNo = element.phoneNumber;

  //       const handleStatusUpdate = (data) => {
  //         const { isOnline, phoneNumber: dataPhone } = data;
  //         if (dataPhone === contectPhNo) {
  //           element.isOnline = isOnline;
  //           element.lastSeen = Date.now();
  //           settrackOnline((prev) => ({
  //             ...prev,
  //             [contectPhNo]: isOnline,
  //             lastSeen: Date.now(),
  //           }))
  //         }
  //       };

  //       socket.emit(`isOnline`, { "phoneNumber": contectPhNo });
  //       socket.on(`${contectPhNo}`, handleStatusUpdate);
  //       listeners.push({ contectPhNo, handler: handleStatusUpdate });
  //     });
  //     return () => {
  //       listeners.forEach(({ contectPhNo, handler }) => {
  //         socket.off(contectPhNo, handler)
  //       })
  //     }
  //   } catch (error) {
  //     console.error({ manualError: "online check error!!" });
  //   }
  // }, [allContectS, socket]);

  // useEffect(() => {
  //   console.log("trackOnline", trackOnline);
  // }, [trackOnline])

  return (
    <>
      <div className="w-full mx-auto p-6 h-full">
        <div className="mx-auto max-w-sm shadow-lg rounded-lg">
          <div className="sm:flex sm:items-center px-2 py-4">
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="font-semibold px-2 py-3 leading-tight">Contacts</h3>
                {/* contact refress Btn */}
                <button onClick={handleGetAllContectRequest} className="cursor-pointer">
                  <i className="bi bi-arrow-clockwise text-xl flex justify-center items-center"></i>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="my-2 w-full text-sm bg-grey-light text-grey-darkest rounded h-10 p-3 focus:outline-none"
              />

              <div className="w-full">
                {allContectS ? (
                  allContectS.map((contact, i) => (

                    <div key={i} className={` ${activeContactIndex !== null ? "" : "hover:scale-105 hover:bg-blue-lightest"} justify-center items-center relative transition-transform grid grid-cols-[1fr_40px] cursor-pointer my-1 rounded`} >
                      <Link to={`/Chat/${contact.phoneNumber}`} className="justify-center items-center flex">
                        <div className="text-center py-1">
                          <i className={`bi bi-dot text-3xl p-0 ${trackOnline[contact.phoneNumber] ? "text-green-400" : "text-red-500"}`}></i>
                        </div>
                        <div className=" w-4/5 h-10 py-3 px-1 grid grid-cols-[1fr_1fr]">
                          <p className="hover:text-blue-dark">
                            {contact.ContactName}
                          </p>
                          <p className="hover:text-blue-dark">
                            {contact.phoneNumber}
                          </p>
                        </div>
                      </Link>

                      <button
                        ref={(el) => (buttonRefs.current[i] = el)}
                        onClick={() => handleThreeDotClick(i)}
                      >

                        <i className="bi bi-three-dots text-xl"></i>
                      </button>
                      {activeContactIndex === i && (
                        <div ref={menuRef} className="absolute top-5 right-7 rounded p-2 z-50">
                          <ThreeDotContectOpt contect={contact.phoneNumber} index={i} />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center">
                    <span className="text-slate-300">There is no Contact</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}