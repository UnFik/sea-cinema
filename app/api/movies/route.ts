import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function GET() {
  try {
    const movie = await prismadb.movie.findMany();
    return NextResponse.json(movie);
  } catch (error) {
    throw new NextResponse("Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      title,
      description,
      age_rating,
      poster_url,
      release_date,
      ticket_price,
    } = (await req.json()) as {
      title: string;
      description: string;
      age_rating: number;
      poster_url: string;
      release_date: string;
      ticket_price: number;
    };

    const body = {
      title,
      description,
      age_rating,
      poster_url,
      release_date,
      ticket_price,
    };

    // console.log('tes');

    if (
      !body.title ||
      !body.description ||
      !body.age_rating ||
      !body.poster_url ||
      !body.release_date ||
      !body.ticket_price
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const movie = await prismadb.movie.create({
      data: {
        title,
        description,
        release_date,
        poster_url,
        age_rating,
        ticket_price,
      },
    });

    // const movie = await prismadb.movie.create({
    //   data: {
    //     title: "FAST X",
    //     description:
    //       "Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
    //     release_date: "2023-05-17",
    //     poster_url:
    //       "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    //     age_rating: 15,
    //     ticket_price: 53000,
    //   },
    // });

    const seatsArr = [];
    for (let i = 1; i <= 64; i++) {
      seatsArr.push(
        await prismadb.seat.create({
          data: {
            movie: {
              connect: { id: movie.id },
            },
            date: new Date(),
            number: i,
            booked: false,
          },
        })
      );
    }

    await prismadb.movie.update({
      where: { id: movie.id },
      data: {
        seats: {
          connect: seatsArr.map((seat) => ({ id: seat.id })),
        },
      },
    });

    return NextResponse.json(movie);
  } catch (error) {
    return new NextResponse(`Error ${error}`, { status: 500 });
  }
}
