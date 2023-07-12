import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const movie = await prismadb.movie.findUnique({
      where: { id: String(params.id) },
    });

    return NextResponse.json({ movie });
  } catch (error) {
    return new NextResponse(`Title Doesnt Exist ${error}`, { status: 400 });
  }
}
