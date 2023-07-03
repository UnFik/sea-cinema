import React, { Key } from "react";
import Navbar from "./components/Navbar";
import TopNavbar from "./components/TopNavbar";
import Link from "next/link";
import fetcher from "@/libs/fetcher";
// import User

async function getData() {
  const res = await fetch("http://localhost:3000/api/movies");

  if (!res.ok) {
    throw new Error("Error");
  }
  return res.json();
}

export default async function Home() {

  const data = await getData();

  const ageRating = (age_rating: number) => {
    if (age_rating < 13) {
      return "/images/su.png";
    } else if (age_rating >= 13 && age_rating < 17) {
      return "/images/r13.png";
    } else {
      return "/images/d17.png";
    }
  };


  return (
    <div className="bg-blue w-full h-full relative">
      <TopNavbar />
      <Navbar />
      {/* <Carousel /> */}
      <div className="lg:ml-8 grid grid-cols-2 lg:grid-cols-4 lg:px-16 lg:gap-y-3">
        {data.map(
          (item: {
            title: string;
            id: Key | null | undefined;
            poster_url: string | undefined;
            age_rating: any;
          }) => (
            <Link
              href={`/${item.title}`}
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
                    alt=""
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
