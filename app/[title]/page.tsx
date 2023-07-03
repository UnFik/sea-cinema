import React from "react";
import { notFound } from "next/navigation";
import TopNavbar from "../components/TopNavbar";
import Navbar from "../components/Navbar";
import Link from "next/link";

async function getData(title: string) {
  const res = await fetch(`http://localhost:3000/api/movies/${title}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

const Movie = async ({ params }: { params: { title: string } }) => {
  const data = await getData(params.title);

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
    <div className="w-full h-full relative ">
      <TopNavbar />
      <Navbar />
      <div className="container ml-2 lg:ml-8 px-4 md:px-16 py-6">
        <h1 className="text-3xl mt-5 mb-4">Now Playing</h1>
        <div className="grid grid-row lg:grid-cols-12 w-full h-full gap-5 lg:gap-8">
          <div className="flex flex-row lg:flex-col lg:col-span-3 col-span-6 justify-between">
            <img
              src={data.poster_url}
              alt="Film poster"
              className="lg:h-8/12 h-4/12 w-6/12 lg:w-full"
            />
            <div className="flex flex-col mx-auto lg:m-0 gap-8">
              <Link href={`/${data.title}/ticket`} className="lg:w-full">
                <div className="btn lg:w-full lg:rounded-none rounded-md bg-yellow-400 text-center px-8 lg:px-3 py-4 font-semibold text-l hover:bg-yellow-300">
                  Buy Ticket
                </div>
              </Link>
              <img
                src={ageRating(data.age_rating)}
                alt="age_rating"
                className="flex lg:hidden w-4/12 lg:w-full mr-auto self-end"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 col-span-6">
            <h2 className="text-xl">{data.title}</h2>
            <p>{data.release_date}</p>
            <h4 className="text-l">Description:</h4>
            <p>{data.description}</p>
            <h4>Price :</h4>
            <p>{data.ticket_price}</p>
          </div>
          <img
            src={ageRating(data.age_rating)}
            alt="age_rating"
            className="hidden lg:flex"
          />
        </div>
      </div>
    </div>
  );
};

export default Movie;
