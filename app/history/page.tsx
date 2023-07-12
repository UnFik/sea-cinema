"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";

interface ticketController {
  id: React.Key | undefined;
  movieId?: String;
  name?: String;
  createdAt?: Date;
  totalPrice?: number;
  seats?: number[];
  movie: {
    title: string;
  };
}

const History = ({ params: { id } }: { params: { id: string } }) => {
  const [tickets, setTicket] = useState<ticketController[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `https://sea-cinema-nujh.vercel.app/api/movies/${id}/ticket`
        );
        if (!res.ok) {
          throw new Error("Error");
        }
        const jsonData = await res.json();
        setTicket(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="bg-blue w-full h-full relative text-gray-200">
      <TopNavbar />
      <Navbar />
      <div className="container lg:ml-8 px-4 md:px-16 py-6 mt-5">
        <h1 className="text-4xl">Ticket List</h1>
        <div className="flex flex-col w-full mt-5 gap-5">
          {tickets.map((ticket: ticketController) => (
            <Link
              href={`/history/${ticket.id}`}
              key={ticket.id}
              className="w-full rounded-md lg:py-5 lg:px-10 px-5 pt-2 pb-6 ticket-gradient shadow-xl cursor-pointer"
            >
              <div className="text-3xl text-center border-b-4 border-gray-200 p-3 font-bold">
                {ticket.movie.title}
              </div>
              <div className="flex flex-row justify-between mt-5 h-full">
                <div className="flex flex-col gap-2 lg:gap-3">
                  <div className="text-sm lg:text-lg truncate">
                    Ticket Owner: {ticket.name}
                  </div>
                  <div className="text-sm lg:text-lg truncate">
                    Date:{" "}
                    {ticket.createdAt
                      ? new Date(ticket.createdAt).toLocaleDateString()
                      : ""}
                  </div>
                  <div className="text-sm lg:text-lg truncate">
                    Total Price: IDR {ticket.totalPrice}
                  </div>
                </div>
                <div className="flex justify-end text-xl lg:text-lg font-bold w-5/12 flex-wrap ">
                  <span className="hidden lg:flex text-3xl">Seats: &nbsp;</span>
                  {ticket.seats?.map((seatNumber, index) => (
                    <div
                      key={seatNumber}
                      className={`text-3xl ${
                        index % 2 === 1 ? "break-all" : ""
                      }`}
                    >
                      {seatNumber}&nbsp;&nbsp;
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
