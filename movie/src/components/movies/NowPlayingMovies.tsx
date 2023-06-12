import { useQuery } from '@tanstack/react-query';
import { getNowPlaying, makeImagePath } from '../../api/api';
import { useEffect, useState } from 'react';
import { Movie } from '../../api/api';
import { Flex, Img, MovieGrid } from '../commonStyle';

const NowPlayingMovies = () => {
  const { data, isLoading } = useQuery(['allPlayingMovies'], getNowPlaying);
  const [playings, setPlayings] = useState<Movie[]>([]);

  useEffect(() => {
    data && setPlayings(data.results);
  }, [data]);

  return (
    <main>
      <MovieGrid>
        {isLoading
          ? 'Loading...'
          : playings.map((movie) => (
              <Flex key={movie.id} width="300px" dir="column" align="flex-start">
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

export default NowPlayingMovies;
