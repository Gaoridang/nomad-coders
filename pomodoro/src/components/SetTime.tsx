import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { minutesState, secondsState } from '../atoms/atom';

const SetTime = () => {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [seconds, setSeconds] = useRecoilState(secondsState);
  const [secondId, setSecondId] = useState(0);
  const [minuteId, setMinuteId] = useState(0);
  const [direction, setDirection] = useState(0);

  const plusMinutes = () => {
    setMinuteId((prev) => prev + 1);
    setMinutes((prev) => prev + 1);
    setDirection(1);
  };

  const minusMinutes = () => {
    setMinuteId((prev) => prev + 1);
    setMinutes((prev) => (prev === 0 ? 0 : prev - 1));
    setDirection(-1);
  };

  const plusSeconds = () => {
    setSecondId((prev) => prev + 1);
    setSeconds((prev) => prev + 1);
    setDirection(1);
  };

  const minusSeconds = () => {
    setSecondId((prev) => prev + 1);
    setSeconds((prev) => (prev === 0 ? 0 : prev - 1));
    setDirection(-1);
  };

  const timeVar = {
    enter: () => ({
      y: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: () => ({
      y: direction < 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Btn onClick={plusMinutes}>
            <IoIosArrowUp />
          </Btn>
          <AnimatePresence initial={false} custom={direction}>
            {/* 숫자가 바뀔 때마다 slider animation */}
            <Time
              custom={direction}
              key={`minute-${minuteId}`}
              variants={timeVar}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {String(minutes).padStart(2, '0')}
            </Time>
          </AnimatePresence>
          <Btn onClick={minusMinutes}>
            <IoIosArrowDown />
          </Btn>
        </Wrapper>
        <Wrapper>
          <Btn onClick={plusSeconds}>
            <IoIosArrowUp />
          </Btn>
          <AnimatePresence initial={false} custom={direction}>
            <Time
              custom={direction}
              variants={timeVar}
              initial="enter"
              animate="center"
              exit="exit"
              key={`second-${secondId}`}
            >
              {String(seconds).padStart(2, '0')}
            </Time>
          </AnimatePresence>
          <Btn onClick={minusSeconds}>
            <IoIosArrowDown />
          </Btn>
        </Wrapper>
        <Link to={`/timer`}>START</Link>
      </Container>
    </>
  );
};

export default SetTime;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  column-gap: 50px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
`;

const Time = styled(motion.div)`
  position: absolute;
  color: black;
  display: flex;
  place-content: center;
  place-items: center;
  font-size: 40px;
  cursor: default;
`;

const Btn = styled.button`
  padding: 5px;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
`;
