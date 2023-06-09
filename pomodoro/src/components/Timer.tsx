import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { goalState, idState, minutesState, roundState, secondsState } from '../data/atom';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { IoStopSharp, IoCloseSharp } from 'react-icons/io5';
import { LuTimerReset } from 'react-icons/lu';
import styled from 'styled-components';
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from 'framer-motion';

const Timer = () => {
  const minutes = useRecoilValue(minutesState);
  const seconds = useRecoilValue(secondsState);
  const [rounds, setRounds] = useRecoilState(roundState);
  const [goals, setGoals] = useRecoilState(goalState);
  const setId = useSetRecoilState(idState);
  const [isRunning, setRunning] = useState(false);
  const [count, setCount] = useState(minutes * 60 + seconds);

  const intervalRef = useRef<number | null>(null);

  // Making Start, Pause, Stop, and Reset Button.
  const start = useCallback(() => {
    if (intervalRef.current !== null) return;

    setRunning(true);

    intervalRef.current = window.setInterval(() => {
      setCount((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return minutes * 60 + seconds;
        }
      });
    }, 1000);
  }, [minutes, seconds]);

  const min = Math.floor(count / 60);
  const sec = count % 60;

  useEffect(() => {
    if (count === 0) {
      if (intervalRef.current !== null) {
        setRounds((prev) => prev + 1);
        clearInterval(intervalRef.current);
        setRunning(false);
        intervalRef.current = null;
      }

      setTimeout(() => {
        setCount(minutes * 60 + seconds);
      }, 1000);
    }

    if (rounds === 4) {
      setRounds(0);
      setGoals((prev) => prev + 1);
    }

    if (goals === 12) {
      setGoals(0);
    }
  }, [count, goals, setGoals, setRunning, minutes, seconds, setRounds, rounds]);

  const pause = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;
    setRunning(false);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;
    setCount(minutes * 60 + seconds);
    setRunning(false);
  }, [setRunning, minutes, seconds]);

  const reset = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;
    setCount(minutes * 60 + seconds);
    setRounds(0);
    setGoals(0);
    setRunning(false);
  }, [minutes, seconds, setGoals, setRunning, setRounds]);

  // Overlay Animation
  const x = useMotionValue(minutes * 60 + seconds);

  useEffect(() => {
    x.set(count);
  }, [x, count]);

  const xInput = [minutes * 60 + seconds, 0];
  const scaleY = useTransform(x, xInput, [0, 1]);

  // Timer Animation
  const controlSec = useAnimationControls();
  const controlMin = useAnimationControls();

  useEffect(() => {
    controlSec.set({ y: 20, opacity: 0.5 });
    controlSec.start({
      y: 0,
      opacity: 1,
    });
  }, [controlSec, sec]);

  useEffect(() => {
    controlMin.set({ y: 20, opacity: 0.5 });
    controlMin.start({
      y: 0,
      opacity: 1,
    });
  }, [controlMin, min]);

  return (
    <AnimatePresence>
      <Overlay key="overlay" style={{ scaleY }} />
      <Wrapper key="wrapper">
        <Container>
          <IoCloseSharp
            size={20}
            onClick={() => setId(0)}
            style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer' }}
          />

          {/* Description of the Buttons */}
          <Description>
            <div>
              <IoStopSharp size={18} />
              <span>Reset time only</span>
            </div>
            <div>
              <LuTimerReset size={18} />
              <span>Reset all</span>
            </div>
          </Description>

          {/* Time */}
          <TimeWrapper>
            <Time>
              <motion.h3 animate={controlMin}>{String(min).padStart(2, '0')}</motion.h3>
              <span>minutes</span>
            </Time>
            <Time>
              <motion.h3 animate={controlSec}>{String(sec).padStart(2, '0')}</motion.h3>
              <span>seconds</span>
            </Time>
          </TimeWrapper>

          {/* Rounds and Goals */}
          <Object>
            <div>
              <span>{rounds}</span>
              <p>rounds</p>
            </div>
            <div>
              <span>{goals}</span>
              <p>goals</p>
            </div>
          </Object>

          {/* Buttons */}
          <BtnWrapper>
            {isRunning ? (
              <Button onClick={pause} whileTap={{ scale: 0.85 }}>
                <IoIosPause />
              </Button>
            ) : (
              <Button onClick={start} whileTap={{ x: 15 }}>
                <IoIosPlay />
              </Button>
            )}
            <Button
              onClick={stop}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 1 }}
              style={{ background: '#ffb9b9' }}
            >
              <IoStopSharp size={24} />
            </Button>
            <Button onClick={reset} whileTap={{ rotate: 180 }}>
              <LuTimerReset size={24} />
            </Button>
          </BtnWrapper>
        </Container>
      </Wrapper>
    </AnimatePresence>
  );
};

export default Timer;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: #4200f9;
  position: absolute;
  transform-origin: 50% 0%;
  opacity: 0.3;
`;

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const Container = styled.div`
  background-color: transparent;
  border-radius: 30px;
  position: relative;
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Time = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  width: 200px;
  height: 200px;

  h3 {
    font-size: 100px;
    font-weight: 500;
  }

  span {
    font-size: 20px;
    font-weight: 300;
    opacity: 0.5;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
`;

const Button = styled(motion.button)`
  display: flex;
  place-content: center;
  place-items: center;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f2f2f2;
`;

const Description = styled.div`
  position: absolute;
  left: 30px;
  top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 30px);
  font-weight: 300;

  div {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }

  span {
    cursor: default;
  }
`;

const Object = styled(motion.div)`
  width: 300px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  column-gap: 50px;
  font-weight: 300;
  margin: 0 0 25px 0;
  padding: 10px 20px;
  border-radius: 10px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 15px;
    opacity: 0.5;
  }
`;
