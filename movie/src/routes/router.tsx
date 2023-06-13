import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Comings from '../components/Comings';
import Playings from '../components/Playings';
import Populars from '../components/Populars';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Populars />,
      },
      {
        path: 'coming-soon',
        element: <Comings />,
      },
      {
        path: 'now-playing',
        element: <Playings />,
      },
    ],
  },
]);

export default router;
