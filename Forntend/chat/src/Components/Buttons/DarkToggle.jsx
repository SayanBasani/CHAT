import { useEffect, useState } from "react";

export default function DarkToggle() {

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    const darkButtonToggelLogo = document.querySelector('.darkButtonToggelLogo');
    if(document.documentElement.classList.contains("dark")){
      darkButtonToggelLogo.classList.remove('bi-sun-fill')
      darkButtonToggelLogo.classList.add('bi-moon-stars-fill')
    }else{
      darkButtonToggelLogo.classList.remove('bi-moon-stars-fill')
      darkButtonToggelLogo.classList.add('bi-sun-fill')
    }
  };
  return (
    <div className="darkTopNav text-gray-900 dark:text-white">
      <button className="" onClick={toggleDarkMode}>
        <i className="darkButtonToggelLogo bi bi-moon-stars-fill"></i>
      </button>
    </div>
  );
}