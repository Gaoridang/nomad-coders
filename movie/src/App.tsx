import './App.css';
import Header from './components/Header';
import { Grid } from './components/commonStyle';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Grid>
      <Header />
      <Outlet />
    </Grid>
  );
}

export default App;
