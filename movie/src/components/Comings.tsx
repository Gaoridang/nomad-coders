import { useQuery } from "@tanstack/react-query";
import { Movie, getComingSoon, makeImagePath } from "../api/api";
import { useEffect, useState } from "react";
import { Container } from "./styles";

const CommingSoonMovies = () => {
  // hook 만들어서 줄일 수 있을지도? ㄴㄴ 무조건 줄여야함
  const { data, isLoading, error } = useQuery(
    ["allComingMovies"],
    getComingSoon
  );
  const [comings, setComings] = useState<Movie[]>([]);

  useEffect(() => {
    data && setComings(data.results);
  }, [data]);

  return (
    <main>
      <Container>
        {isLoading
          ? "Loading"
          : comings.map((movie) => (
              <div key={movie.id}>
                <img src={makeImagePath(movie.poster_path)} alt={movie.title} />
              </div>
            ))}
      </Container>
    </main>
  );
};

export default CommingSoonMovies;
