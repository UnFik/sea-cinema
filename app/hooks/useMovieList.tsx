import useSWR from "swr"
import fetcher from "@/libs/fetcher";

function useMovieList() {
  const { data, error, isLoading } = useSWR("/api/movies", fetcher);
  return {
    data,
    error,
    isLoading,
  };
}

export default useMovieList;
