import { motion, Variants } from "framer-motion";
import { Movie, makeImagePath } from "../api/api";
import { Container } from "./styles";

const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

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
            <motion.div
              key={movie.id}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div layoutId={`card-${movie.id}`} variants={cardVariants}>
                <motion.img
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
              </motion.div>
            </motion.div>
          ))}
    </Container>
  );
};

export default Movies;
