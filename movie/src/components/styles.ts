import { styled } from "styled-components";
import breakPoints from "../styles/breakPoints";
import { motion } from "framer-motion";

export const Container = styled(motion.div)`
  position: relative;
  columns: 4;
  column-gap: 28px;
  max-width: 1000px;
  margin: 20px;

  div {
    width: 100%;
    padding: 8px 8px 0 8px;
    background-color: #222222;
    margin-bottom: 10px;

    div {
      display: inline-block;
      width: 100%;
      padding: 0;

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
            background-color: #7d7d7d;
            border-radius: 2px;
            padding: 3px;
          }
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
