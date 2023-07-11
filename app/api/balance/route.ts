import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function GET() {
  try {
    const balance = await prismadb.balance.findFirst();
    return NextResponse.json(balance);
  } catch (error) {
    throw new NextResponse("Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { amount } = (await req.json()) as {
      amount: number;
    };

    const body = { amount };

    if (!body.amount) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const balance = await prismadb.balance.findFirst();

    if (!balance) {
      throw new Error("Balance not found");
    }

    const newBalance = await prismadb.balance.update({
      where: { id: balance?.id },
      data: {
        amount: {
          increment: body.amount,
        },
      },
    });

    return NextResponse.json(newBalance);
    // return NextResponse.json(newBalance);
  } catch (error) {
    throw new NextResponse(`Error ${error}`, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { amount } = (await req.json()) as {
      amount: number;
    };

    const body = { amount };

    if (!body.amount) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const balance = await prismadb.balance.findFirst();

    if (!balance) {
      throw new Error("Balance not found");
    }

    const newBalance = await prismadb.balance.update({
      where: { id: balance?.id },
      data: {
        amount: {
          decrement: body.amount,
        },
      },
    });

    return NextResponse.json(newBalance);
    // return NextResponse.json(newBalance);
  } catch (error) {
    throw new NextResponse(`Error ${error}`, { status: 500 });
  }
}
