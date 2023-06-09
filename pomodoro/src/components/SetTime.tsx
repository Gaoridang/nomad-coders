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
  const [direction, setDirection] = useState(false);

  const plusMinutes = () => {
    setDirection(false);
    setMinuteId((prev) => prev + 1);
    setMinutes((prev) => prev + 1);
  };

  const minusMinutes = () => {
    setDirection(true);
    setMinuteId((prev) => prev + 1);
    setMinutes((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const plusSeconds = () => {
    setDirection(false);
    setSecondId((prev) => prev + 1);
    setSeconds((prev) => prev + 1);
  };

  const minusSeconds = () => {
    setDirection(true);
    setSecondId((prev) => prev + 1);
    setSeconds((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const timeVar = {
    enter: () => ({
      y: direction ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: () => ({
      y: direction ? -100 : 100,
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
          <Box>
            <TimeContainer>
              <AnimatePresence initial={false} custom={direction}>
                {/* 숫자가 바뀔 때마다 slider animation */}
                <Time
                  custom={direction}
                  key={`minute-${minuteId}`}
                  variants={timeVar}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {String(minutes).padStart(2, '0')}
                </Time>
              </AnimatePresence>
            </TimeContainer>
            <span>minutes</span>
          </Box>
          <Btn onClick={minusMinutes}>
            <IoIosArrowDown />
          </Btn>
        </Wrapper>
        <Wrapper>
          <Btn onClick={plusSeconds}>
            <IoIosArrowUp />
          </Btn>
          <Box>
            <TimeContainer>
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
            </TimeContainer>
            <span>seconds</span>
          </Box>
          <Btn onClick={minusSeconds}>
            <IoIosArrowDown />
          </Btn>
        </Wrapper>
        <Link to={`/timer`}>Set the time</Link>
      </Container>
    </>
  );
};

export default SetTime;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* justify-content: center;
  align-items: center; */
  width: 200px;
  height: 300px;
  place-content: center;
  place-items: center;

  a {
    // 버튼으로 바꾸기
    grid-column: span 2;
    text-decoration: none;
    color: inherit;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;

  span {
    position: relative;
    top: 20px;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Time = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  color: black;
  display: flex;
  flex-direction: column;
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
  font-size: 20px;
`;

// 스타일링 너무 오래 걸림
// 모션...
//
