"use client";

import React, { Key, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TopNavbar from "./components/TopNavbar";
import Link from "next/link";

// async function getData() {
//   const res = await fetch("http://localhost:3000/api/movies");

//   if (!res.ok) {
//     throw new Error("Error");
//   }
//   return res.json();
// }

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          "http://localhost:3000/api/movies"
        );
        if (!res.ok) {
          throw new Error("Error");
        }
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, []);

  const ageRating = (age_rating: number) => {
    if (age_rating < 13) {
      return "/images/su.png";
    } else if (age_rating >= 13 && age_rating < 17) {
      return "/images/r13.png";
    } else {
      return "/images/d17.png";
    }
  };

  if (!data || data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary bg-center bg-cover w-full h-full relative pb-40">
      <TopNavbar />
      <Navbar />
      {/* <Carousel /> */}
      <div className="lg:ml-8 grid grid-cols-2 lg:grid-cols-4 lg:px-16 lg:gap-y-3 text-gray-200">
        {data.map(
          (item: {
            title: string;
            id: number;
            poster_url: string;
            age_rating: number;
          }) => (
            <Link
              href={`/${item.id}`}
              className="card w-full bg-base-100 shadow-xl  lg:hover:scale-110"
              key={item.id}
            >
              <figure>
                <img
                  src={item.poster_url}
                  alt="poster"
                  className="w-full object-contain px-2"
                />
              </figure>
              <div className="card-body px-4">
                <h2 className="card-title w-full text-ellipsis overflow-hidden text-center mt-4 lg:text-xl lg:h-14">
                  {item.title}
                </h2>
                <div className="card-actions gap-3 justify-center flex my-2">
                  <img
                    src={ageRating(item.age_rating)}
                    alt="age rating"
                    className="my-4"
                  />
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
