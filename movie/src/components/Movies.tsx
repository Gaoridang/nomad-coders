import { motion } from "framer-motion";
import { Movie, makeImagePath } from "../api/api";
import { Container } from "./styles";

interface Props {
  onClick: (movie: Movie) => void;
  isLoading: boolean;
  movies: Movie[] | undefined;
}

const Movies = ({ onClick, isLoading, movies }: Props) => {
  return (
    <Container>
      {isLoading
        ? "Loading"
        : movies?.map((movie) => (
            <div key={movie.id}>
              <motion.img
                layoutId={`card-${movie.id}`}
                onClick={() => onClick(movie)}
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
    </Container>
  );
};

export default Movies;
