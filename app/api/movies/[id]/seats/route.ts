import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const movieId = url.pathname.slice(12).split("/", 1)[0].replace(/%20/g, " ");
  try {
    const movie = await prismadb.movie.findMany({
      where: {
        id: movieId,
      },
    });

    const seats = await prismadb.seat.findMany({
      where: {
        movieId: movieId,
      },
      include: {
        movie: true,
      },
    });

    if (!movie) {
      return new NextResponse("Movie not found", { status: 404 });
    }

    // const availableSeats = movie.seats.filter((seat) => !seat.booked);

    return NextResponse.json({ seats });
  } catch (error) {
    throw new NextResponse("Error", { status: 500 });
  }
}
