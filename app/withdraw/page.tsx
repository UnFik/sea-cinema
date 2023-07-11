"use client";

import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import Select from "react-select";
import { useRouter } from "next/navigation";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";

const options = [
  { value: "Shopeepay", label: "Shopeepay" },
  { value: "Gopay", label: "Gopay" },
  { value: "OVO", label: "OVO" },
];

export default function page() {
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  const handleConfirm = async () => {
    if (cardNumber === null || amount === null || amount < 0) {
      alert("Please fill all fields");
      return;
    }

    const parsedAmount = Number(amount);

    const res = await fetch("http://localhost:3000/api/balance", {
      method: "PATCH",
      body: JSON.stringify({
        amount: parsedAmount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(`${res.status} Error`);
      return;
    }
    alert("Withdraw Success");
    router.push("/");
  };

  return (
    <div className="relative h-full w-full bg-black bg-center bg-no-repeat bg-fixed bg-cover">
      <div className="h-full w-full bg-black/50">
        <TopNavbar />
        <Navbar />
        <div className="flex justify-center align-middle">
          <div className="bg-black/80 px-10 lg:px-16 py-16 lg:mt-2 w-10/12 lg:w-2/5 lg:max-w-md rounded-md mt-7 ">
            <h2 className="text-white text-3xl font-semibold mb-8">Withdraw</h2>
            <div className="flex flex-col gap-5">
              <Select options={options} />
              <Input
                id="number"
                onChange={(ev: any) => setCardNumber(ev.target.value)}
                value={cardNumber !== null ? cardNumber : ""}
                label="Merchant Number"
                type="number"
              />
              <Input
                id="amount"
                onChange={(ev: any) => setAmount(ev.target.value)}
                value={amount !== null ? amount : ""}
                label="Amount"
                type="number"
              />
              <button
                onClick={handleConfirm}
                className="btn bg-green-500 hover:bg-green-600 rounded-md py-2"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
