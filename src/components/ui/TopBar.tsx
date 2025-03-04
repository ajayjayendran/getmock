"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { applyTheme, toggleTheme } from "@/utils/theme";
import LogoDark from "../../../public/icons/logo-dark.svg";
import LogoLight from "../../../public/icons/logo-light.svg";
import { Sun, Moon } from "lucide-react";

const TopBar = () => {
  const [mode, setMode] = useState("");

  const toggle = (theme: string) => {
    setMode(theme);
    toggleTheme();
  };

  useEffect(() => {
    applyTheme();
    setMode(localStorage.getItem("theme") || "");
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-neutral-100 shadow-md z-50 py-2 px-4 flex justify-between items-center">
      <Link href="/">
        <Image src={mode === "dark" ? LogoLight : LogoDark} alt="Logo" />
      </Link>

      <div className="flex gap-4 bg-neutral-90 px-4 py-2 rounded-full">
        <div
          className={`p-1 cursor-pointer transition-all duration-300 ease-in-out rounded-full ${
            mode === "light" ? "bg-primary-100 scale-110" : "opacity-70"
          } flex items-center justify-center`}
          onClick={() => toggle("light")}
        >
          <Sun
            size={20}
            className={`flex-shrink-0 ${
              mode === "dark"
                ? "text-font-primary-100"
                : "text-font-secondary-90"
            }`}
          />
        </div>

        <div
          className={`cursor-pointer transition-all duration-300 ease-in-out rounded-full ${
            mode === "dark" ? "bg-primary-100 scale-110" : "opacity-70"
          } p-1 flex items-center justify-center`}
          onClick={() => toggle("dark")}
        >
          <Moon
            size={20}
            className={`flex-shrink-0 ${
              mode === "light"
                ? "text-font-primary-100"
                : "text-font-secondary-90"
            }`}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
