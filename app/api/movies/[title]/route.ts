import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { title: string };
  }
) {
    try {
      const movie = await prismadb.movie.findUnique({
        where: { title: String(params.title) },
      })
      console.log(movie);
      // const res = await fetch("http://localhost:3000/api/movies");
      // const data = await res.json();

      // const movie = data.find(
      //   (movie: { title: string; }) => movie.title.toLowerCase() === params.title.toLowerCase()
      // );
      return NextResponse.json(movie);
    } catch (error) {
    
      return new NextResponse("Title Doesnt Exist", { status: 400 });
    }
  // const res = await fetch("http://localhost:3000/api/movies");
  // const data = await res.json();
  // console.log(params.title);
  // const movie = data.find(
  //   (movie) => movie.title.toLowerCase() === params.title.toLowerCase()
  // );
  // console.log(movie);
  // return NextResponse.json(movie);
}
