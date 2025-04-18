import { useNavigate } from "react-router";
import { deleteUserContect } from "../../Storage/ApiRequest";
import { getAllContect } from "../../Storage/Account";
import { useContext } from "react";
import { AllStorage } from "../../Storage/StorageProvider";

export default function ThreeDotContectOpt({ contect, index }) {
  const { allContectS, setallContectS } = useContext(AllStorage);
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
  const handleDeleteContect = async()=>{
    const deleteContctResponse = await deleteUserContect({phoneNumber:contect});
    console.log("the delete response is --->",deleteContctResponse);
    if(!deleteContctResponse){console.log("error on delete contect");}
    console.log("sucessfully delete");
    if(deleteContctResponse.complet){
      handleGetAllContectRequest()
    }
  }
  console.log('contect :>> ', contect);
  const navigate = useNavigate();
  return (<>
    <ul className="darkTopNav border rounded-md py-3 px-2 flex flex-col justify-center gap-2">
      <button className="hover:text-blue-500 cursor-pointer" onClick={() => {
        console.log("clicked");
        navigate(`/Chat/${contect}`)
      }}>
        Message
      </button>
      <button onClick={handleDeleteContect} className="flex justify-center hover:text-blue-500 cursor-pointer">Delete</button>
    </ul>
  </>)
};
