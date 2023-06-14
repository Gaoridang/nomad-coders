import { Movie, getNowPlaying, makeImagePath } from "../api/api";

import useMovies from "../hooks/useMovies";
import { useState } from "react";
import Movies from "./Movies";
import Modal from "./Modal";

const Playings = () => {
  // const { data, isLoading } = useQuery(["allPlayingMovies"], getNowPlaying);
  // const [playings, setPlayings] = useState<Movie[]>([]);

  // useEffect(() => {
  //   data && setPlayings(data.results);
  // }, [data]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedBgImg, setSelectedBgImg] = useState<string | null>(null);
  const { movies, isLoading, error } = useMovies(
    "allPlayingMovies",
    getNowPlaying
  );

  const onClick = (movie: Movie) => {
    setSelectedId(movie.id);
    setSelectedImg(makeImagePath(movie.poster_path));
    setSelectedBgImg(makeImagePath(movie.backdrop_path));
  };

  return (
    <main>
      <Movies movies={movies} onClick={onClick} isLoading={isLoading} />
      <Modal
        setSelectedId={setSelectedId}
        selectedId={selectedId}
        selectedImg={selectedImg}
        selectedBgImg={selectedBgImg}
      />
    </main>
  );
};

export default Playings;
