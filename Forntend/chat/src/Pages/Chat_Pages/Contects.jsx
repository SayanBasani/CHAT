import Add_New_Contect_Button from "../../Components/Contect_components/Add_New_Contect_Button";
import Add_new_Contect_form from "../../Components/Contect_components/Add_new_Contect_form";
import All_Contect_Preview from "../../Components/Contect_components/All_Contect_Preview";

export default function Contects(params) {
  return (<>
    <div className="easyonOff grid Contects h-full">
      <div className="flex flex-col overflow-auto">
        <All_Contect_Preview />
      </div>
      <div className="z-30 darkTopNav absolute bottom-5 right-5 text-2xl border rounded-full w-9 h-9 flex items-center justify-center">
        <Add_New_Contect_Button />
      </div>
    </div>

    <Add_new_Contect_form />

  </>)
};
