import React from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";

const TopNavbar = () => {
  return (
    <nav className="w-full bg-primary">
      <div className="px-4 md:px-16 py-6">
        <div className="flex lg:justify-between justify-center items-center gap-7 ml-auto">
          <img src="/next.svg" className="h-7 lg:h-10 ml-8" alt="" />
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition hidden lg:flex">
            <PiMagnifyingGlassBold className="w-6" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
