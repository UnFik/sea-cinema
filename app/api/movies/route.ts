import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import prismadb from "@/libs/prismadb";

export async function GET() {
  try {
    const movie = await prismadb.movie.findMany();
    return NextResponse.json(movie);
  } catch (error) {
    throw new NextResponse("Error", { status: 500 });
  }
}

export async function POST(req: Request){
  try {
    const {
      title,
      description,
      age_rating,
      poster_url,
      release_date,
      ticket_price,
      seats
    } = await req.json();

    console.log('tes');

    if(!title || !description || !age_rating || !poster_url || !release_date || !ticket_price){
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const movie = await prismadb.movie.create({
      data: {
        title,
        description,
        age_rating,
        poster_url,
        release_date,
        ticket_price,
        seats: {
          create: {
            number: null,
          }
        },
      },
    });


    const seatsArr = [];
    for (let i = 0; i < 64; i++) {
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

// const res = await fetch("https://seleksi-sea-2023.vercel.app/api/movies");
// if (!res.ok) {
//   notFound();
// }
// const data = await res.json();

// export async function POST(req: Request) {
//   try {
//     const { username, email, password } = (await req.json()) as {
//       username: string;
//       email: string;
//       password: string;
//     };
//     const hashedPassword = await bcrypt.hash(password, 12);

//     const user = await prismadb.user.create({
//       data: {
//         email,
//         username,
//         hashedPassword,
//         image: "",
//         emailVerified: new Date(),
//       },
//     });

//     if (!username || !email || !password) {
//       return new NextResponse("Missing fields", { status: 400 });
//     }

//     const existingUser = await prismadb.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (existingUser) {
//       return new NextResponse("User already exists", { status: 400 });
//     }

//     return NextResponse.json({
//       user: {
//         name: user.username,
//         email: user.email,
//       },
//     });
//   } catch (error: any) {
//     return new NextResponse(
//       JSON.stringify({
//         status: "error",
//         message: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }
