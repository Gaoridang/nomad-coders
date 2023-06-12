import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to={''}>Popular</Link>
      <Link to={'now-playing'}>Playing</Link>
      <Link to={'coming-soon'}>Coming</Link>
    </header>
  );
};

export default Header;
