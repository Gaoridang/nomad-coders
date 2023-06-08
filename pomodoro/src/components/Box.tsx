import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useScroll,
} from 'framer-motion';

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white;
  background: linear-gradient(180deg, #d0e, #91f);
`;

const Square = styled(motion.div)`
  position: relative;
  width: 150px;
  height: 150px;
  background-color: #fff;
  border-radius: 50px;
  gap: 15px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr); */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

// const SmallBox = styled(motion.div)`
//   width: 50px;
//   height: 50px;
//   border-radius: inherit;
//   background-color: white;
// `;

// const Circle = styled(motion.div)`
//   background: white;
//   border-radius: 100%;
// `;

// const square = {
//   hidden: { opacity: 0, scale: 0 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { delay: 0.3, delayChildren: 0.3, staggerChildren: 0.2 },
//   },
// };

// const circle = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

const Box = () => {
  // const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // useMotionValueEvent(x, 'change', (latest) => console.log(latest));

  // useEffect(() => {
  //   const unsubX = x.on('change', (x) => console.log(x));
  //   const unsubY = y.on('change', (y) => console.log(y));

  //   return () => {
  //     unsubX();
  //     unsubY();
  //   };
  // }, [x, y]);

  const rotate = useTransform(x, [-300, 300], [-360, 360]);
  const background = useTransform(x, [-300, 0, 300], ['#ff8d8d', '#ff6767', '#580000']);
  useMotionValueEvent(rotate, 'change', (n) => console.log(n));

  // const box = {
  //   hidden: { opacity: 1, scale: 0 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: { delay: 0.5, duration: 0.3, delayChildren: 0.3, staggerChildren: 0.1 },
  //   },
  // };

  return (
    <Wrapper style={{ background }}>
      {/* <Square variants={square} initial="hidden" animate="visible">
        <Circle variants={circle} />
        <Circle variants={circle} />
        <Circle variants={circle} />
        <Circle variants={circle} />
      </Square> */}
      <Square style={{ x, rotate }} dragSnapToOrigin drag="x">
        {/* <SmallBox drag dragConstraints={constraintsRef} /> */}
      </Square>
    </Wrapper>
  );
};

export default Box;
