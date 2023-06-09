import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { minutesState, secondsState } from '../atoms/atom';

const Timer = () => {
  const minutes = useRecoilValue(minutesState);
  const seconds = useRecoilValue(secondsState);
  const [countMin, setCountMin] = useState(0);
  const [countSec, setCountSec] = useState(0);

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const count = minutes * 60 + seconds;

    const min = Math.floor(count / 60);
    const sec = count - min * 60;

    setCountMin(min);
    setCountSec(sec);
  }, [minutes, seconds]);

  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) return;

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
              return 0;
            }
          });
          return 59;
        }
      });
    }, 1000);
  }, []);

  return (
    <div>
      <p>
        {String(countMin).padStart(2, '0')} : {String(countSec).padStart(2, '0')}
      </p>
      <button onClick={startTimer}>start</button>
    </div>
  );
};

export default Timer;
