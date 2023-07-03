"use client";

import React from "react";
import TopNavbar from "@/app/components/TopNavbar";
import Link from "next/link";

const Theater = async () => {


  return (
    <div className="bg-blue w-full h-full relative">
      <TopNavbar />
      <div className="ml-4 lg:ml-8 lg:px-16 mt-4">
        <p>Date : 01-01-2023</p>
        
        <p className="mt-2">
          Tickets: 1, Total: Rp 40000
        </p>
      </div>
      <h1 className="uppercase mt-6 text-center font-bold lg:text-2xl">
        BEAUTIFUL DISASTER
      </h1>
      <div className="lg:mx-8 lg:px-16 seat mt-6 px-3 grid grid-cols-9 gap-4 w-full justify-center text-center">
        <Link href="/" className="lg:p-5 px-4 py-1 bg-green-500 rounded-md">
          1
        </Link>
        <Link href="/" className="lg:p-5 px-4 py-1 bg-green-500 rounded-md">
          2
        </Link>
        <Link href="/" className="lg:p-5 px-4 py-1 bg-green-500 rounded-md">
          3
        </Link>
        <Link href="/" className="lg:p-5 px-4 py-1 bg-green-500 rounded-md">
          4
        </Link>
        <div className="">&nbsp;</div>
        <Link href="/" className="lg:p-5 px-4 py-1 bg-green-500 rounded-md">
          5
        </Link>
        <Link href="/" className="lg:p-5 px-4 py-1 bg-green-500 rounded-md">
          6
        </Link>
        <Link href="/" className="lg:p-5 px-4 py-1 bg-green-500 rounded-md">
          7
        </Link>
        <Link href="/" className="lg:p-5 px-4 py-1 bg-green-500 rounded-md">
          8
        </Link>
       
      </div>

      <div className="flex flex-row mt-9 w-full">
        <div className="w-full justify-center border text-center text-3xl">
          Screen
        </div>
      </div>
    </div>
  );
};

export default Theater;
