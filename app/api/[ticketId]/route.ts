import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { ticketId: string };
  }
) {
  try {
    const ticket = await prismadb.ticket.findMany({
      where: { id: String(params.ticketId) },
      include: {
        movie: true,
      },
    });

    return NextResponse.json(ticket);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { ticketId: string };
  }
) {
  try {
    const ticket = await prismadb.ticket.delete({
      where: { id: String(params.ticketId) },
      include: { movie: true },
    });

    const seats = ticket?.seats || [];
    const movieId = ticket?.movieId || "";

    if (!movieId) {
      throw new Error("Movie ID not found");
    }

    await prismadb.seat.updateMany({
      where: { number: { in: seats }, movieId: ticket?.movieId },
      data: { booked: false },
    });

    const movie = await prismadb.movie.findUnique({
      where: { id: movieId },
      select: { ticket_price: true },
    });

    if (!movie) {
      throw new Error("Movie not found");
    }

    const totalPrice = ticket?.totalPrice || 0;
    const balance = await prismadb.balance.findFirst();

    if (!balance) {
      throw new Error("Balance not found");
    }

    const updatedBalance = balance?.amount + totalPrice;

    await prismadb.balance.update({
      where: { id: balance?.id },
      data: { amount: updatedBalance },
    });

    return NextResponse.json(`Delete Succeed ${ticket}`);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 400 });
  }
}
