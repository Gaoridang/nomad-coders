import { getNowPlaying, makeImagePath } from "../api/api";

import { Container } from "./styles";
import useMovies from "../hooks/useMovies";

const NowPlayingMovies = () => {
  // const { data, isLoading } = useQuery(["allPlayingMovies"], getNowPlaying);
  // const [playings, setPlayings] = useState<Movie[]>([]);

  // useEffect(() => {
  //   data && setPlayings(data.results);
  // }, [data]);

  const { movies, isLoading, error } = useMovies(
    "allPlayingMovies",
    getNowPlaying
  );

  return (
    <main>
      <Container>
        {isLoading
          ? "Loading..."
          : movies?.map((movie) => (
              <div key={movie.id}>
                <img src={makeImagePath(movie.poster_path)} alt={movie.title} />
              </div>
            ))}
      </Container>
    </main>
  );
};

export default NowPlayingMovies;
