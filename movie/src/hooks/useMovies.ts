import { useQuery } from "@tanstack/react-query";
import { Movie } from "../data/api";
import { useEffect, useState } from "react";

const useMovies = (queryKey: string[], queryFn: () => Promise<any>) => {
  const { data, error, isLoading } = useQuery(queryKey, queryFn);
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    data && setMovies(data.results);
  }, [data]);

  if (error) {
    return { error, isLoading };
  }

  return { movies, error, isLoading };
};

export default useMovies;
