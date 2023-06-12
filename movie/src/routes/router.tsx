import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ComingSoonMovies from '../components/movies/ComingSoonMovies';
import NowPlayingMovies from '../components/movies/NowPlayingMovies';
import PopularMovies from '../components/movies/PopularMovies';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <PopularMovies />,
      },
      {
        path: 'coming-soon',
        element: <ComingSoonMovies />,
      },
      {
        path: 'now-playing',
        element: <NowPlayingMovies />,
      },
    ],
  },
]);

export default router;
