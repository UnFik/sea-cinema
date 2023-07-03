// import prismadb from "@/libs/prismadb";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { movie,  } = parse(req.url, true);
//   const { title } = query;

//   try {
//     const movie = await prismadb.movie.findUnique({
//       where: { title: String(title) },
//       include: { seats: true },
//     });

//     console.log(movie);

//     if (!movie) {
//       return new NextResponse("Movie not found", { status: 404 });
//     }

//     const availableSeats = movie.seats.filter((seat) => !seat.booked);

//     return NextResponse.json({ seats: availableSeats });
//   } catch (error) {
//     throw new NextResponse("Error", { status: 500 });
//   }
// }
