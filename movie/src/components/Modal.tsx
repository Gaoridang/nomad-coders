import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";
import useDetails from "../hooks/useDetails";

const Container = styled(motion.div)<{ bgImg: string }>`
  position: fixed;
  inset: 0;
  overflow-y: scroll;
  background-image: ${(props) =>
    props.bgImg ? `url(${props.bgImg})` : "none"};
  background-size: cover;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: ${(props) =>
      props.bgImg ? `url(${props.bgImg})` : "none"};
    background-size: cover;
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }

  div {
    width: 700px;
    margin: 50px auto 0 auto;

    div {
      display: flex;
      width: 100%;
      min-width: 700px;

      img {
        z-index: 100;
      }

      div {
        display: flex;
        flex-direction: column;
        margin: 0;
        color: #fff;
        background-color: #000000;
        min-width: 200px;

        h3 {
          font-weight: 500;
          margin: 10px 3px 10px 10px;
        }

        p {
          line-height: 1.4;
          font-weight: 300;
          opacity: 0.7;
          padding-left: 18px;
          padding-right: 18px;
        }
      }
    }
  }
`;

const description = {
  hidden: {
    opacity: 0,
    x: -200,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
      duration: 0.3,
      ease: [0.69, -0.01, 0.62, 0.99],
    },
  },
};

interface Props {
  selectedImg: string | null;
  selectedBgImg: string | null;
  selectedId: number | null;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
}

const Modal = ({
  selectedImg,
  selectedBgImg,
  selectedId,
  setSelectedId,
}: Props) => {
  const { details } = useDetails(`${selectedId}`);

  if (!selectedId) return;

  return (
    <Container onClick={() => setSelectedId(null)} bgImg={selectedBgImg || ""}>
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          {selectedImg ? (
            <motion.img
              layoutId={`card-${selectedId}`}
              src={selectedImg}
              alt=""
            />
          ) : null}
          <motion.div variants={description} initial="hidden" animate="visible">
            <h3>Genres</h3>
            {details?.genres?.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
            <h3>Productions</h3>
            {details?.production_companies?.map((company) => (
              <p key={company.id}>{company.name}</p>
            ))}
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default Modal;
