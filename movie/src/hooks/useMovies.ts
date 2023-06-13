import { useQuery } from "@tanstack/react-query";
import { APIResponse, Movie } from "../api/api";
import { useEffect, useState } from "react";

const useMovies = (
  queryKey: string,
  callbackFn: () => Promise<APIResponse>
) => {
  const { data, error, isLoading } = useQuery([queryKey], callbackFn);
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    data && setMovies(data.results);
  }, [data]);

  return { movies, error, isLoading };
};

export default useMovies;
