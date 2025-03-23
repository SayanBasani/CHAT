import API_BASE_URL from "../../config";

export default function Add_New_Contect_Button(params) {
  
  const handleAddContect = async(event)=>{
    document.querySelector(".Add_new_Contect_form").classList.toggle("hidden");
  }
  return (<>
    <div>
      <button onClick={handleAddContect} className="cursor-pointer">
        <i className="bi bi-person-add"></i>
      </button>
    </div>
  </>)
};
