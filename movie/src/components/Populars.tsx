import { useEffect, useState } from "react";
import { Movie, getPopular, makeImagePath } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { Container } from "./styles";

const Header = () => {
  // 왜 data.results. 다음 자동 완성이 안 되지?
  const [populars, setPopulars] = useState<Movie[]>([]);
  const { data, isLoading } = useQuery(["allPopularMovies"], getPopular);

  useEffect(() => {
    // 이거 이렇게 써도 되나?
    data && setPopulars(data.results);
  }, [data]);

  // 실제 데이터를 가져오려면 fetch 함수를 만드는 방법 밖에 없나?
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
          : populars.map((movie) => (
              <div key={movie.id}>
                <img src={makeImagePath(movie.poster_path)} alt={movie.title} />
              </div>
            ))}
      </Container>
    </main>
  );
};

export default Header;
