import { getPopular, makeImagePath } from "../api/api";
import { Container } from "./styles";
import useMovies from "../hooks/useMovies";

const Header = () => {
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

  return (
    <main>
      <Container>
        {isLoading
          ? // 로딩 모션 만들기!
            "Loading..."
          : movies?.map((movie) => (
              <div key={movie.id}>
                <img src={makeImagePath(movie.poster_path)} alt={movie.title} />
              </div>
            ))}
      </Container>
    </main>
  );
};

export default Header;
