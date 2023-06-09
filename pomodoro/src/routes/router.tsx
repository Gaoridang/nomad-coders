import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SetTime from '../components/SetTime';
import Timer from '../components/Timer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <SetTime />,
      },
      {
        path: 'timer',
        element: <Timer />,
      },
    ],
  },
]);

export default router;
