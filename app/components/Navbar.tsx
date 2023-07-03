"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BsFillBellFill, BsChevronCompactDown } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { ImFilm } from "react-icons/im";
import { RxAvatar } from "react-icons/rx";
import { PiPlayPauseDuotone, PiFilmSlateBold } from "react-icons/pi";
import logo from "../../public/next.svg";

// import AccountMenu from "@/components/AccountMenu";
import NavbarItem from "./NavbarItem";

const TOP_OFFSET = 60;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    var prevScrollpos = window.scrollY;
    const handleScroll = () => {
      var currentScrollPos = window.scrollY;
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
      if (prevScrollpos > currentScrollPos) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav
      className={`w-full bg-secondary lg:sticky lg:h-21 fixed lg:top-0 transition ease-linear duration-700 ${
        showNav ? "bottom-0" : "-bottom-20"
      }`}
    >
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center justify-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <div className="flex-row ml-8 gap-8 hidden lg:flex">
          <div className="flex items-center gap-2 hover:text-yellow-300">
            {/* <PiPlayPauseDuotone /> */}
            <NavbarItem label="Now Playing" />
          </div>
          <div className="flex items-center gap-2 hover:text-yellow-300">
            {/* <PiFilmSlateBold /> */}
            <NavbarItem label="Films" />
          </div>
          <div className="flex items-center gap-2 hover:text-yellow-300">
            {/* <FaHistory /> */}
            <NavbarItem label="History" />
          </div>
        </div>
        <div className="flex-row lg:hidden flex gap-9">
          <div className="flex-col">
            {/* <FaRegPlayCircle className="w-6 my-1 mx-auto" /> */}
            <NavbarItem label="Playing" />
          </div>
          <div className="flex-col">
            {/* <ImFilm className="w-6 my-1 mx-auto" /> */}
            <NavbarItem label="Films" />
          </div>
          <div className="flex-col">
            {/* <FaHistory className="w-6 my-1 mx-auto" /> */}
            <NavbarItem label="History" />
          </div>
          <div className="flex-col">
            {/* <RxAvatar className="w-6 my-1 mx-auto" /> */}
            <NavbarItem label="Profile" />
          </div>
        </div>
        <div className="hidden lg:flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            {/* <BsFillBellFill className="w-6" /> */}
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full overflow-hidden">
              <img src="/images/avatar.png" alt="" />
            </div>
            <BsChevronCompactDown
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
