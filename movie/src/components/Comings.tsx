import { getComingSoon, makeImagePath } from "../api/api";
import { Container } from "./styles";
import useMovies from "../hooks/useMovies";

const CommingSoonMovies = () => {
  // hook 만들어서 줄일 수 있을지도? ㄴㄴ 무조건 줄여야함
  // const { data, isLoading, error } = useQuery(
  //   ["allComingMovies"],
  //   getComingSoon
  // );
  // const [comings, setComings] = useState<Movie[]>([]);

  // useEffect(() => {
  //   data && setComings(data.results);
  // }, [data]);

  const { movies, isLoading, error } = useMovies(
    "allComingMovies",
    getComingSoon
  );

  return (
    <main>
      <Container>
        {isLoading
          ? "Loading"
          : movies?.map((movie) => (
              <div key={movie.id}>
                <img src={makeImagePath(movie.poster_path)} alt={movie.title} />
              </div>
            ))}
      </Container>
    </main>
  );
};

export default CommingSoonMovies;
