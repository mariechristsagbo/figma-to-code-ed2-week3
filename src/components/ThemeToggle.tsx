'use client'
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
        <img src="/icons/moon.svg" alt="Dark Mode" className="w-5 h-5" />
      ) : (
        <img src="/icons/sun.svg" alt="Light Mode" className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
