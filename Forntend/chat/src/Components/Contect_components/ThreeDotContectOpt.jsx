export default function ThreeDotContectOpt(params) {
  return (<>
    <ul className=" darkExtraPage border rounded-md py-3 px-2 flex flex-col justify-center gap-2">
      <li className="flex justify-center"><button className="cursor-pointer" onClick={()=>{
        console.log("clicked");
        
      }}>Message</button></li>
      <li className="flex justify-center"><button className="cursor-pointer">Delete</button></li>
    </ul>
  </>)
};
