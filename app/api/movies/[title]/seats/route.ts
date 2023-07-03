import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { parse } from "url";

export async function GET(req: Request) {

  try {
    // console.log(req.url);
    const movie = await prismadb.seat.findMany({
      where : {
        number : 55
      }
    })

    if (!movie) {
      return new NextResponse("Movie not found", { status: 404 });
    }

    // const availableSeats = movie.seats.filter((seat) => !seat.booked);

    return NextResponse.json({ movie });
  } catch (error) {
    throw new NextResponse("Error", { status: 500 });
  }
}
