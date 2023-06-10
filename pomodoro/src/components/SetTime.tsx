import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { idState } from '../atoms/atom';

const SetTime = () => {
  const setId = useSetRecoilState(idState);

  return (
    <>
      <Container>
        <Circle onClick={() => setId(1)} />
      </Container>
    </>
  );
};

export default SetTime;

const Container = styled.div`
  display: flex;
  place-content: center;
  place-items: center;

  span {
    grid-column: span 2;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
`;

const Circle = styled(motion.div)`
  width: 200px;
  height: 200px;
`;

// 스타일링 너무 오래 걸림
// 모션...
//
