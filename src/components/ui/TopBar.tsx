"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { applyTheme, toggleTheme } from "@/utils/theme";
import LogoDark from "../../../public/icons/logo-dark.svg";
import LogoLight from "../../../public/icons/logo-light.svg";
import Sun from "../../../public/icons/sun.svg";
import Moon from "../../../public/icons/moon.svg";

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
    <header className="fixed top-0 left-0 w-full bg-neutral-100 shadow-md z-50 py-3 px-4 flex justify-between items-center">
      <Link href="/">
        <Image src={mode === "dark" ? LogoLight : LogoDark} alt="Logo" />
      </Link>

      <div className="flex gap-4 bg-neutral-90 px-4 py-2 rounded-full">
        <div
          className={`cursor-pointer transition-all duration-300 ease-in-out rounded-full ${
            mode === "light" ? "bg-primary-100 scale-110" : "opacity-70"
          } p-1 flex items-center justify-center`}
          onClick={() => toggle("light")}
        >
          <Image
            src={Sun}
            alt="Sun Icon"
            height={20}
            width={20}
            className="flex-shrink-0"
          />
        </div>

        <div
          className={`cursor-pointer transition-all duration-300 ease-in-out rounded-full ${
            mode === "dark" ? "bg-primary-100 scale-110" : "opacity-70"
          } p-1 flex items-center justify-center`}
          onClick={() => toggle("dark")}
        >
          <Image
            src={Moon}
            alt="Moon Icon"
            height={20}
            width={20}
            className="flex-shrink-0"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
