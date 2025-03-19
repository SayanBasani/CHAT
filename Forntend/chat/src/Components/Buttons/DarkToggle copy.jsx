import { useEffect, useState } from "react";

export default function DarkToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const theme = localStorage.getItem("theme");
  console.log(theme);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="">Dark Mode Toggle</h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded-lg transition-all"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}