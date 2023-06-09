import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { minutesState, secondsState } from '../atoms/atom';

const Timer = () => {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [seconds, setSeconds] = useRecoilState(secondsState);

  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) return;

    intervalRef.current = window.setInterval(() => {
      setSeconds((prevSec) => {
        if (prevSec < 0) {
          return 59;
        } else {
          return prevSec - 1;
        }
      });
    }, 1000);
  }, [setSeconds]);

  useEffect(() => {
    if (seconds < 0 && minutes > 0) {
      setMinutes((prevMin) => prevMin - 1);
      setSeconds(59);
    } else if (seconds === 0 && minutes === 0 && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [seconds, minutes, setMinutes, setSeconds]);

  return (
    <div>
      {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
      <button onClick={startTimer}>start</button>
    </div>
  );
};

export default Timer;
