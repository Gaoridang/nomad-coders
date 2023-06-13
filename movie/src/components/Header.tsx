import { Link } from "react-router-dom";
import { styled } from "styled-components";
import breakPoints from "../styles/breakPoints";

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  column-gap: 30px;
  height: 60px;

  @media only screen and (${breakPoints.device.sm}) {
    font-size: 1rem;
    column-gap: 20px;
  }
`;

const Header = () => {
  return (
    <Container>
      <Link to={""}>Popular</Link>
      <Link to={"now-playing"}>Playing</Link>
      <Link to={"coming-soon"}>Coming</Link>
    </Container>
  );
};

export default Header;
