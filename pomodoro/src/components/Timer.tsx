import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { goalState, minutesState, roundState, secondsState } from '../atoms/atom';
import { IoIosPlay, IoIosPause } from 'react-icons/io';
import { IoStopSharp } from 'react-icons/io5';
import { LuTimerReset } from 'react-icons/lu';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Timer = () => {
  const minutes = useRecoilValue(minutesState);
  const seconds = useRecoilValue(secondsState);
  const [countMin, setCountMin] = useState(0);
  const [countSec, setCountSec] = useState(0);
  const [rounds, setRounds] = useRecoilState(roundState);
  const [goals, setGoals] = useRecoilState(goalState);
  const [isRunning, setRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const count = minutes * 60 + seconds;

    const min = Math.floor(count / 60);
    const sec = count - min * 60;

    setCountMin(min);
    setCountSec(sec);
  }, [setCountMin, setCountSec, minutes, seconds]);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return;

    setRunning(true);

    intervalRef.current = window.setInterval(() => {
      setCountSec((prevSec) => {
        if (prevSec > 0) {
          return prevSec - 1;
        } else {
          setCountMin((prevMin) => {
            if (prevMin > 0) {
              return prevMin - 1;
            } else {
              if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              setCountSec(seconds);
              setRounds((prev) => prev + 1);
              return minutes;
            }
          });
          return 59;
        }
      });
    }, 1000);
  }, [minutes, seconds, setCountSec, setCountMin, setRounds]);

  useEffect(() => {
    if (rounds === 4) {
      setRounds(0);
      setGoals((prev) => prev + 1);
    }
    if (goals === 12) {
      setGoals(0);
    }
  }, [rounds, goals, setRounds, setGoals]);

  const reset = useCallback(() => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCountMin(minutes);
    setCountSec(seconds);
    setRounds(0);
    setGoals(0);
    setRunning(false);
  }, [minutes, seconds, setCountMin, setCountSec, setGoals, setRunning, setRounds]);

  const pause = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setRunning(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCountMin(minutes);
    setCountSec(seconds);
    setRunning(false);
  }, [setCountMin, setCountSec, setRunning, minutes, seconds]);

  return (
    <Container>
      <Description>
        <IoStopSharp size={18} />
        <span>Reset time only</span>
        <LuTimerReset size={18} />
        <span>Reset all</span>
      </Description>
      <TimeWrapper>
        <Time>{String(countMin).padStart(2, '0')}</Time>
        <Time>{String(countSec).padStart(2, '0')}</Time>
      </TimeWrapper>
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
          onClick={reset}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 1 }}
          style={{ background: '#ffb9b9' }}
        >
          <IoStopSharp size={24} />
        </Button>
        <Button onClick={stop} whileTap={{ rotate: 180 }}>
          <LuTimerReset size={24} />
        </Button>
      </BtnWrapper>
    </Container>
  );
};

export default Timer;

const Container = styled.div`
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
  justify-content: center;
  align-items: center;
  padding: 30px;
  font-size: 100px;
  width: 200px;
  height: 200px;
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
  left: 0;
  top: 0;
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: repeat(2, 30px);
  font-weight: 300;
`;
