import { useQuery } from '@tanstack/react-query';
import { Movie, getComingSoon, makeImagePath } from '../../api/api';
import { useEffect, useState } from 'react';
import { Flex, Img, MovieGrid } from '../commonStyle';

const CommingSoonMovies = () => {
  // hook 만들어서 줄일 수 있을지도?
  const { data, isLoading, error } = useQuery(['allComingMovies'], getComingSoon);
  const [comings, setComings] = useState<Movie[]>([]);

  useEffect(() => {
    data && setComings(data.results);
  }, [data]);

  return (
    <main>
      <MovieGrid>
        {isLoading
          ? 'Loading'
          : comings.map((movie) => (
              <Flex key={movie.id} dir="column" align="flex-start">
                <Img
                  height="444px"
                  width="296px"
                  src={makeImagePath(movie.poster_path)}
                  alt={movie.title}
                />
                <span>{movie.title}</span>
              </Flex>
            ))}
      </MovieGrid>
    </main>
  );
};

export default CommingSoonMovies;
