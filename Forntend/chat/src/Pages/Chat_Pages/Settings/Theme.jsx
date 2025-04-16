import React, { useEffect, useState, useContext } from 'react';
import { HexColorPicker } from "react-colorful";
import { AllStorage } from '../../../Storage/StorageProvider';

function Theme() {
   const {
    _mainbarColor,
    setmainbarColor,
    _bgColor,
    setbgColor
  } = useContext(AllStorage);
  // Get from localStorage before first render
  const getInitialMainbarColor = () => localStorage.getItem("mainbarColor") || "#aabbcc";
  const getInitialBgColor = () => localStorage.getItem("bgColor") || "#ffffff";

  const [mainbarColor, setMainbarColor] = useState(getInitialMainbarColor);
  const [bgColor, setBgColor] = useState(getInitialBgColor);

  // Update localStorage when values change
  useEffect(() => {
    localStorage.setItem("mainbarColor", mainbarColor);
    setmainbarColor(mainbarColor)
  }, [mainbarColor]);

  useEffect(() => {
    localStorage.setItem("bgColor", bgColor);
    setbgColor(bgColor)
  }, [bgColor]);

  return (
    <div className='max-md:grid flex w-full h-full p-4 gap-3 justify-evenly items-center'>

      <div className='grid gap-3'>
        <span className='text-2xl font-semibold'>Bars Theme</span>
        <div className='grid justify-center'>
          <HexColorPicker color={mainbarColor} onChange={setMainbarColor} />
        </div>
        <div className='flex justify-center font-semibold'>
          <span className='flex gap-3 justify-center items-center'>
            Your Selected Color :-
            <div className="w-8 h-8 rounded border" style={{ backgroundColor: mainbarColor }}></div>
          </span>
        </div>
      </div>

      <div className='grid gap-3'>
        <span className='text-2xl font-semibold'>Background Theme</span>
        <div className='grid justify-center'>
          <HexColorPicker color={bgColor} onChange={setBgColor} />
        </div>
        <div className='flex justify-center font-semibold'>
          <span className='flex gap-3 justify-center items-center'>
            Your Selected Color :-
            <div className="w-8 h-8 rounded border" style={{ backgroundColor: bgColor }}></div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Theme;
