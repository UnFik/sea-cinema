import useSWR from "swr";
import fetcher from "@/libs/fetcher";

function useBalance() {
  const { data, error, isLoading } = useSWR("/api/balance", fetcher);
  return {
    data,
    error,
    isLoading,
  };
}

export default useBalance;
