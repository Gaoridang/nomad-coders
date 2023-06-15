import { Movie, getComingSoon, makeImagePath } from "../data/api";
import useMovies from "../hooks/useMovies";
import { useState } from "react";
import Modal from "./Modal";
import Movies from "./Movies";

const Comings = () => {
  // hook 만들어서 줄일 수 있을지도? ㄴㄴ 무조건 줄여야함

  // const { data, isLoading, error } = useQuery(
  //   ["allComingMovies"],
  //   getComingSoon
  // );
  // const [comings, setComings] = useState<Movie[]>([]);

  // useEffect(() => {
  //   data && setComings(data.results);
  // }, [data]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedBgImg, setSelectedBgImg] = useState<string | null>(null);
  const { movies, isLoading, error } = useMovies(
    "allComingMovies",
    getComingSoon
  );

  const onClick = (movie: Movie) => {
    setSelectedId(movie.id);
    setSelectedImg(makeImagePath(movie.poster_path));
    setSelectedBgImg(makeImagePath(movie.backdrop_path));
  };

  // 이것도 그냥 props 받아오게 만들면? 너무 과한가?
  return (
    <>
      <main>
        <Movies movies={movies} onClick={onClick} isLoading={isLoading} />
        {/* <Container>
          {isLoading
            ? "Loading"
            : movies?.map((movie) => (
                <div key={movie.id}>
                  <motion.img
                    layoutId={`card-${movie.id}`}
                    onClick={() => {
                      setSelectedId(movie.id);
                      setSelectedImg(makeImagePath(movie.poster_path));
                    }}
                    src={makeImagePath(movie.poster_path)}
                    alt={movie.title}
                  />
                  <div>
                    <p>{movie.title}</p>
                    <div>
                      {movie.adult ? <span>19</span> : <span>All</span>}
                      <span>{movie.popularity}</span>
                      <span>d</span>
                    </div>
                  </div>
                </div>
              ))}
        </Container> */}
        {/* 오른쪽에 찔끔 남는 공간은 뭐지? */}
        <Modal
          setSelectedId={setSelectedId}
          selectedId={selectedId}
          selectedImg={selectedImg}
          selectedBgImg={selectedBgImg}
        />
      </main>
    </>
  );
};

export default Comings;
