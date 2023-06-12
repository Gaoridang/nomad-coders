import { useEffect, useState } from 'react';
import { Movie, getPopular, makeImagePath } from '../api/api';

const Header = () => {
  // 왜 data.results. 다음 자동 완성이 안 되지?
  const [populars, setPopulars] = useState<Movie[] | null>(null);

  // 실제 데이터를 가져오려면 fetch 함수를 만드는 방법 밖에 없나?
  useEffect(() => {
    const fetchPopularMovies = async () => {
      const data = await getPopular();
      setPopulars(data.results);
    };

    fetchPopularMovies();
  }, []);

  return (
    <>
      <div>
        {populars &&
          populars.map((movie) => (
            <img key={movie.id} src={makeImagePath(movie.poster_path)} alt={movie.title} />
          ))}
      </div>
    </>
  );
};

export default Header;
