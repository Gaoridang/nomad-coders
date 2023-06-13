import { styled } from "styled-components";
import breakPoints from "../styles/breakPoints";

export const Container = styled.div`
  columns: 4;
  column-gap: 20px;
  max-width: 1000px;
  padding: 10px;

  div {
    width: 100%;
    margin-bottom: 10px;

    img {
      width: 100%;
      border-radius: 15px;
    }
  }

  @media only screen and (${breakPoints.device.md}) {
    columns: 3;
  }
  @media only screen and (${breakPoints.device.sm}) {
    columns: 2;
  }
  @media only screen and (${breakPoints.device.xs}) {
    columns: 1;
  }
`;
