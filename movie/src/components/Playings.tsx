import { useQuery } from "@tanstack/react-query";
import { getNowPlaying, makeImagePath, Movie } from "../api/api";
import { useEffect, useState } from "react";

import { Container } from "./styles";

const NowPlayingMovies = () => {
  const { data, isLoading } = useQuery(["allPlayingMovies"], getNowPlaying);
  const [playings, setPlayings] = useState<Movie[]>([]);

  useEffect(() => {
    data && setPlayings(data.results);
  }, [data]);

  return (
    <main>
      <Container>
        {isLoading
          ? "Loading..."
          : playings.map((movie) => (
              <div key={movie.id}>
                <img src={makeImagePath(movie.poster_path)} alt={movie.title} />
              </div>
            ))}
      </Container>
    </main>
  );
};

export default NowPlayingMovies;
