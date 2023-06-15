import { Movie, getPopular, makeImagePath } from "../data/api";
import useMovies from "../hooks/useMovies";
import Modal from "./Modal";
import Movies from "./Movies";
import { useState } from "react";

const Populars = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedBgImg, setSelectedBgImg] = useState<string | null>(null);
  const { movies, isLoading, error } = useMovies(
    "allPopularMovies",
    getPopular
  );

  // react query를 안 쓰고 실제 데이터를 가져오려면 fetch 함수를 만드는 방법 밖에 없나?
  // useEffect(() => {
  //   const fetchPopularMovies = async () => {
  //     const data = await getPopular();
  //     setPopulars(data.results);
  //   };

  //   fetchPopularMovies();
  // }, []);

  const onClick = (movie: Movie) => {
    setSelectedId(movie.id);
    setSelectedImg(makeImagePath(movie.poster_path));
    setSelectedBgImg(makeImagePath(movie.poster_path));
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

export default Populars;
