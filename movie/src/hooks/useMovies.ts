import { useQuery } from "@tanstack/react-query";
import { APIResponse } from "../api/api";

const useMovies = (
  queryKey: string,
  callbackFn: () => Promise<APIResponse>
) => {
  const { data, error, isLoading } = useQuery([queryKey], callbackFn);

  return { data, error, isLoading };
};

export default useMovies;
