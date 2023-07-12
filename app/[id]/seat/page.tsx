"use client";

import React, { useEffect, useState } from "react";
import TopNavbar from "@/app/components/TopNavbar";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input";
import Navbar from "@/app/components/Navbar";

const Theater = ({ params: { id } }: { params: { id: string } }) => {
  const url = new URL(window.location.href);
  const urlOrigin = url.origin;
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);

  const [balance, setBalance] = useState<number>(0);
  const [data, setData] = useState<any>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < 6) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.slice(0, count - 1)
      );
    }
  };

  const toggleBook = (seatNumber: number) => {
    if (selectedSeats.length < count) {
      const seatIndex = selectedSeats.indexOf(seatNumber);
      if (!data[seatNumber - 1].booked && seatIndex === -1) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else if (seatIndex !== -1) {
        const updatedSeats = [...selectedSeats];
        updatedSeats.splice(seatIndex, 1);
        setSelectedSeats(updatedSeats);
      }
    } else if (selectedSeats.includes(seatNumber)) {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
      setSelectedSeats(updatedSeats);
    }

    // Update selectedSeats in localStorage
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (count !== selectedSeats.length) {
      alert("Please select the correct number of seats.");
      return;
    }
    if (name === "" || age === null) {
      alert("Please fill in your name and age.");
      return;
    }

    if (age > 100) {
      alert("You are too old");
      return;
    }

    if (age < data[0]?.movie.age_rating) {
      alert("You are too young, go watch other movies");
      return;
    }

    if (balance < totalPrice) {
      alert("Balance is not enough");
      return;
    }
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    await handleForm();
  };

  const handleForm = async () => {
    const res = await fetch(
      `https://sea-cinema-nujh.vercel.app/api/movies/${id}/ticket`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          selectedSeats,
          totalPrice,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      alert("Error");
      return;
    }
    alert("Ticket book Success");
    router.push("/history");
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`${urlOrigin}/api/movies/${id}/seats`, {
          method: "GET",
        });
        const resBalance = await fetch(`${urlOrigin}/api/balance`);
        if (!res.ok || !resBalance.ok) {
          throw new Error("Error");
        }
        const storedSelectedSeats = localStorage.getItem("selectedSeats");
        if (storedSelectedSeats) {
          setSelectedSeats(JSON.parse(storedSelectedSeats));
        }

        const jsonData = await res.json();
        const jsonBalance = await resBalance.json();
        setData(jsonData.seats);
        setBalance(jsonBalance.amount);
      } catch (error) {
        return new NextResponse("error fetch", { status: 500 });
      }
    }

    getData();

    return () => {
      localStorage.removeItem("selectedSeats");
    };
  }, []);

  let totalPrice: number;
  totalPrice = data[0]?.movie.ticket_price * count || 0;

  return (
    <div className="bg-blue w-full h-full relative text-gray-200">
      <TopNavbar />
      <Navbar />
      <div className="ml-4 lg:ml-8 lg:px-6 lg:pr-12 mt-4 ">
        <h1 className="uppercase my-6 text-center font-bold lg:text-2xl">
          {data[0]?.movie?.title || "Loading..."}
        </h1>
        <p>Release date : {data[0]?.movie?.release_date || "Loading..."}</p>

        <p className="mt-2">
          Tickets: {count}, Total: Rp {totalPrice || "Loading..."}
        </p>
        <div className="flex h-h-12 w-48 mt-5 m-auto">
          <div
            className="btn px-2 py-1 m-4 cursor-pointer bg-gray-500"
            onClick={decrement}
          >
            -
          </div>
          <div
            className="appearance-none outline-none focus:outline-none text-center justify-center
          w-full bg-gray-300 font-semibold text-md hover:text-black
          focus:text-black md:text-basecursor-default flex items-center
          text-gray-700"
          >
            {count}
          </div>
          <div
            className="btn px-2 py-1 m-4 cursor-pointer bg-gray-500"
            onClick={increment}
          >
            +
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-9 w-full">
        <div className="w-full justify-center border text-center text-3xl">
          Screen
        </div>
      </div>
      <div className="lg:mx-8 lg:px-6 lg:pr-12 seat mt-6 px-3 grid grid-cols-9 gap-4 w-full justify-center text-start lg:text-center">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item: { number: number; booked: boolean }) =>
            (item.number - 4) % 8 === 0 ? (
              // eslint-disable-next-line react/jsx-key
              <div className="col-span-2 w-full grid grid-cols-2">
                <div
                  onClick={() => toggleBook(item.number)}
                  className={`lg:p-5 px-5 py-1 cursor-pointer ${
                    item.booked
                      ? "bg-red-600 cursor-default"
                      : selectedSeats.includes(item.number)
                      ? "bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  } rounded-md `}
                  key={item.number}
                >
                  {item.number}
                </div>
                <div className="">&nbsp;</div>
              </div>
            ) : (
              <div
                onClick={() => toggleBook(item.number)}
                className={`lg:p-5 px-5 py-1 cursor-pointer ${
                  item.booked
                    ? "bg-red-600 cursor-default"
                    : selectedSeats.includes(item.number)
                    ? "bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } rounded-md `}
                key={item.number}
              >
                {item.number}
              </div>
            )
          )
        ) : (
          <p className="w-full mx-auto">Loading...</p>
        )}
      </div>
      <div
        onClick={() => window.my_modal_3.showModal()}
        className="btn bg-green-600 hover:bg-green-700 cursor-pointer w-full justify-center text-center text-3xl py-3 mt-10"
      >
        Submit
      </div>

      <dialog
        id="my_modal_3"
        className="modal rounded-md w-8/12 h-72 lg:w-5/12"
      >
        <form
          method="dialog"
          className="modal-box w-full max-w-full flex flex-col justify-center"
        >
          <h3 className="font-bold text-lg text-center">Ticket Form</h3>
          <div className="flex flex-col gap-7 mt-4">
            <Input
              id="name"
              onChange={(ev: any) => setName(ev.target.value)}
              value={name}
              label="Name"
              type="text"
            />
            <Input
              id="number"
              onChange={(ev: any) => setAge(ev.target.value)}
              value={age !== null ? age : ""}
              label="Age"
              type="number"
            />
          </div>
          <div className="modal-action mx-auto w-full flex mt-8">
            <button className="btn text-center px-4 py-3 bg-red-500 mx-auto rounded-md">
              Close
            </button>
            <button
              onClick={handleSubmit}
              className="btn text-center px-4 py-3 bg-green-500 mx-auto rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default Theater;
