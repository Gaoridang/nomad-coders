import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
  background-image: linear-gradient(145deg, #0f0e2a, #2d2a80);
`;

const El = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: #fff;
  border-radius: 30px;
`;

const transition = { type: 'spring', delay: 1, duration: 0.8, ease: [0, 0.71, 0.2, 1.01] };
const variant = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: transition },
};

const Box = () => {
  return (
    <Wrapper>
      <El variants={variant} initial="start" animate="end" />
    </Wrapper>
  );
};

export default Box;
