"use client";

import TopNavbar from "@/app/components/TopNavbar";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

interface ticketController {
  id: String;
  movieId: String;
  seats: number[];
  name: String;
  totalPrice: number;
  movie: {
    title: String;
    release_date: String;
  };
  createdAt: String;
}

const TicketDetail = ({
  params: { ticketId },
}: {
  params: { ticketId: string };
}) => {
  const router = useRouter();
  const [ticket, setTicket] = useState<ticketController>();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `https://sea-cinema-nujh.vercel.app/api/${ticketId}`
        );
        if (!res.ok) {
          throw new Error("Error");
        }
        const jsonData = await res.json();
        setTicket(jsonData[0]);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  const handleCancel = async () => {
    const res = await fetch(
      `https://sea-cinema-nujh.vercel.app/api/${ticketId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      alert("Error");
      throw new Error("Error");
    }
    alert("Ticket canceled");
    router.push("/");
  };

  const bookCode = ticket?.id.slice(-4);
  const ticketPrice = (ticket?.totalPrice ?? 0) / (ticket?.seats?.length || 0);

  return (
    <div className="relative h-full w-full text-gray-200">
      <TopNavbar />
      <Navbar />
      <div className="w-full h-full lg:ml-8 px-4 md:px-16 py-6 mt-5 justify-center">
        <h1 className="text-3xl text-center">Ticket Detail</h1>
        <div className="text-xl mt-5 text-center border-y-2 border-gray-400 py-4">
          Book Id :{" "}
          <span className="text-sm text-gray-500 mb-0 pb-0">{ticket?.id}</span>{" "}
        </div>
        <div className="grid grid-cols-12 mt-5">
          <div className="col-span-4">
            <img src="/images/poster.jpg" className="w-full" alt="" />
          </div>
          <div className="">&nbsp;</div>
          <div className="col-span-6 flex flex-col gap-4 lg:gap-4 text-lg">
            <div className="text-xl truncate">{ticket?.movie.title}</div>
            <div className="truncate">Owner : {ticket?.name}</div>
            <div className="truncate">Date : {ticket?.movie.release_date}</div>
            <div className="">Book Code : {bookCode}</div>
            <div className="hidden lg:flex flex-col gap-4">
              <div className="flex flex-row">
                Seat :&nbsp;{" "}
                {ticket?.seats.map((seatNumber, index) => (
                  <div key={seatNumber} className="">
                    {index === ticket.seats.length - 1
                      ? seatNumber
                      : seatNumber + ","}
                    &nbsp;
                  </div>
                ))}
              </div>
              <div className="">Total Ticket : {ticket?.seats?.length}</div>
              <div className="">Ticket Price : {ticketPrice}</div>
              <div className="">Total Price : {ticket?.totalPrice} </div>
              <div
                onClick={handleCancel}
                className="btn text-center bg-red-600 p-4 mt-5 hover:bg-red-500 rounded-md mb-10"
              >
                Cancel Ticket
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:hidden flex-col w-full">
          <div className="grid grid-cols-12">
            <div className="text-lg col-span-4">
              <div className="">Seat</div>
              <div className="">Total Ticket</div>
              <div className="">Ticket Price</div>
              <div className="">Total Price</div>
            </div>
            <div className="text-lg col-span-8">
              <div className="flex flex-row">
                : &emsp;
                {ticket?.seats.map((seatNumber, index) => (
                  <div key={seatNumber} className="">
                    {index === ticket.seats.length - 1
                      ? seatNumber
                      : seatNumber + ","}
                    &nbsp;
                  </div>
                ))}{" "}
              </div>
              <div className="">: &emsp;{ticket?.seats?.length} </div>
              <div className="">: &emsp;{ticketPrice} </div>
              <div className="">: &emsp;{ticket?.totalPrice} </div>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="btn text-center bg-red-600 p-4 mt-7 hover:bg-red-500 rounded-md mb-10"
          >
            Cancel Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
