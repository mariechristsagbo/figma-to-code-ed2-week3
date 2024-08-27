'use client'
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      root.classList.remove("dark");
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 border rounded-lg dark:border-tokena-dark-gray dark:border-opacity-40"
    >
      {theme === "light" ? (
        <img src="/icons/moon.svg" className="w-5 h-5 text-tokena-blue" alt="dark mode"/>
      ) : (
        <img src="/icons/sun.svg" className="w-5 h-5 text-yellow-500" alt="light mode"/>
      )}
    </button>
  );
};

export default ThemeToggle;
