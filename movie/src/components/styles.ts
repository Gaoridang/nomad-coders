import { styled } from "styled-components";
import breakPoints from "../styles/breakPoints";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  position: relative;
  columns: 4;
  column-gap: 20px;
  max-width: 1000px;
  padding: 0 20px;

  div {
    display: inline-block;
    width: 100%;
    margin-bottom: 20px;
    background-color: #222222;

    img {
      width: 100%;
    }

    div {
      font-family: "Ubuntu", sans-serif;
      font-weight: 500;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: #222222;
      color: ${(props) => props.theme.color.background};
      font-weight: 500;
      padding: 10px;
      margin: 0;

      div {
        margin-top: 5px;
        padding: 0;
        display: flex;
        flex-direction: row;
        gap: 5px;
        font-weight: 300;
        font-size: 0.8rem;

        span {
          background-color: #000000;
          border-radius: 2px;
          padding: 3px;
        }
      }
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
