import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const tickets = await prismadb.ticket.findMany({
    include: {
      movie: true,
    },
  });

  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const movieId = url.pathname
      .slice(12)
      .split("/", 1)[0]
      .replace(/%20/g, " ");

    const { name, selectedSeats, totalPrice } = (await req.json()) as {
      name: string;
      selectedSeats: number[];
      totalPrice: number;
    };

    const body = { name, selectedSeats, totalPrice };

    if (!body.name || !body.selectedSeats || !body.totalPrice) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const balance = await prismadb.balance.findFirst();
    if (!balance) {
      return new NextResponse("Balance not found", { status: 404 });
    }

    if (balance.amount < totalPrice) {
      return new NextResponse("Insufficient balance", { status: 400 });
    }

    const seat = await prismadb.seat.findFirst({
      where: {
        movieId: movieId,
        number: {
          in: selectedSeats,
        },
      },
    });

    if (!seat) {
      return new NextResponse(`Seat ${selectedSeats} not found`, {
        status: 404,
      });
    }

    const existingTicket = await prismadb.ticket.findFirst({
      where: {
        seats: {
          hasEvery: selectedSeats,
        },
      },
    });

    if (existingTicket) {
      // Handle the case when a ticket with the same seatId already exists
      return new NextResponse(
        `Ticket for seat ${selectedSeats} already exists`,
        {
          status: 409,
        }
      );
    }

    const createdTicket = await prismadb.ticket.create({
      data: {
        name,
        movie: { connect: { id: movieId } },
        seats: selectedSeats,
        totalPrice,
      },
    });

    // Update seat status to 'booked'
    await prismadb.seat.updateMany({
      where: {
        movieId: movieId,
        number: { in: selectedSeats },
      },
      data: {
        booked: true,
      },
    });

    await prismadb.balance.update({
      where: {
        id: balance.id,
      },
      data: {
        amount: balance.amount - totalPrice,
      },
    });

    return new NextResponse(`Ticket created successfully `, {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(`Error Request ${error}`, { status: 500 });
  }
}
