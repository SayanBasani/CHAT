import { useNavigate } from "react-router";

export default function ThreeDotContectOpt({ contect, index }) {
  console.log('contect :>> ', contect);
  const navigate = useNavigate();
  return (<>
    <ul className="darkExtraPage border rounded-md py-3 px-2 flex flex-col justify-center gap-2">
      <button className="hover:text-blue-500 cursor-pointer" onClick={() => {
        console.log("clicked");
        navigate(`/Chat/${contect}`)
      }}>
        Message
      </button>
      <button className="flex justify-center hover:text-blue-500 cursor-pointer">Delete</button>
    </ul>
  </>)
};
