import { useQuery } from "@tanstack/react-query";
import { MovieDetail, getMovie } from "../api/api";
import { useEffect, useState } from "react";

const useDetails = (id: string) => {
  const { data } = useQuery(["movie", id], () => getMovie(id));
  const [details, setDetails] = useState<MovieDetail>();

  useEffect(() => {
    data && setDetails(data);
  }, [data]);

  return { details };
};

export default useDetails;
