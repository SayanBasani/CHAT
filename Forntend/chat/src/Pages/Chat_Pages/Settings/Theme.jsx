import React, { useEffect, useState, useContext } from 'react';
import { HexColorPicker } from "react-colorful";
import { AllStorage } from '../../../Storage/StorageProvider';
import Switch from "react-switch"

function Theme() {
  const {
    _mainbarColor,
    setmainbarColor,
    _bgColor,
    setbgColor,
    _fontColor,
    setfontColor
  } = useContext(AllStorage);
  // Get from localStorage before first render
  const [switchChecked, setSwitchChecked] = useState(
    ()=>{
      const localCustomval = localStorage.getItem("CustomTheme");
      console.log("localCustomval ---",localCustomval);
      return  localCustomval || false;
    }
  );

  const getInitialMainbarColor = () => localStorage.getItem("mainbarColor") || "#aabbcc";
  const getInitialBgColor = () => localStorage.getItem("bgColor") || "#ffffff";
  const getInitialfontColor = () => localStorage.getItem("fontColor") || "#ffffff";
  const getInitialCustomFont = () => localStorage.getItem("CustomTheme") || false;

  const [mainbarColor, setMainbarColor] = useState(getInitialMainbarColor);
  const [bgColor, setBgColor] = useState(getInitialBgColor);
  const [fontColor, setFontColor] = useState(getInitialfontColor);

  // Update localStorage when values change
  useEffect(() => {
    localStorage.setItem("mainbarColor", mainbarColor);
    setmainbarColor(mainbarColor);
  }, [mainbarColor]);

  useEffect(() => {
    localStorage.setItem("bgColor", bgColor);
    setbgColor(bgColor)
  }, [bgColor]);

  useEffect(() => {
    localStorage.setItem("fontColor", fontColor);
    setfontColor(fontColor)
  }, [fontColor]);
  
  
  const handleChange = (chaecked) => {
    console.log(chaecked);
    localStorage.setItem("CustomTheme",chaecked);
    setSwitchChecked((val)=> {return !val});
    if (!chaecked) {
      localStorage.setItem("bgColor", "rgb(30, 43, 62)");
      setbgColor("rgb(30, 43, 62)");
      localStorage.setItem("mainbarColor", "rgb(12, 10, 36)");
      setmainbarColor("rgb(12, 10, 36)");
      localStorage.setItem("fontColor", "rgb(255, 255, 255)");
      setfontColor("rgb(255, 255, 255)")
    }
  }

  useEffect(()=>{
    console.log("val switchChecked -->>",switchChecked);
  },[switchChecked])
  return (
    <div className='w-full h-full p-4 gap-3'>
      {/* <span className='text-3xl font-semibold flex items-center'> Theme </span> */}
      <div className=' sticky flex gap-3 items-center z-50'>
        <span className='text-3xl font-semibold flex items-center'> Custom theme </span>
        <span className='text-2xl font-semibold flex items-center'> 
          {/* <Switch defaultValue={switchChecked} defaultChecked={switchChecked} onChange={handleChange} checked={switchChecked} /> </span> */}
          <Switch onChange={handleChange} checked={switchChecked} /> </span>
      </div>
      <div className={`${switchChecked ? "hidden" : ""} top-0 left-0 fixed w-full h-full backdrop-blur-md bg-white/30 z-30`}></div>
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

        <div className='grid gap-3'>
          <span className='text-2xl font-semibold'>Fonts Color</span>
          <div className='grid justify-center'>
            <HexColorPicker color={fontColor} onChange={setFontColor} />
          </div>
          <div className='flex justify-center font-semibold'>
            <span className='flex gap-3 justify-center items-center'>
              Your Selected Color :-
              <div className="w-8 h-8 rounded border" style={{ backgroundColor: fontColor }}></div>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Theme;
