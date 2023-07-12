"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";

const TopNavbar = () => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`http://localhost:3000/api/balance`);
        if (!res.ok) {
          throw new Error("Error");
        }
        const jsonData = await res.json();
        setBalance(jsonData.amount);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  return (
    <nav className="w-full bg-secondary lg:bg-primary">
      <div className="px-4 md:px-16 py-6">
        <div className="flex h-full justify-between items-center ml-auto">
          <a href="/">
            <Image
              src="/next.svg"
              alt="logo"
              className="h-7 lg:h-10 lg:ml-8"
              width={200}
              height={200}
            />
            {/* <img src="/next.svg" className="h-7 lg:h-10 lg:ml-8" alt="" /> */}
          </a>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition lg:flex">
            <h1>
              <span className="hidden lg:inline-block">Balance : </span> Rp{" "}
              {balance}
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
