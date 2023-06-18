import { useEffect, useRef, useState } from "react";
import { ONE_SECOND, WORK_TIME } from "../constants";

export const usePomodoroTimer = () => {
  const [count, setCount] = useState(WORK_TIME);
  const intervalRef = useRef<NodeJS.Timer>();

  intervalRef.current = setInterval(() => {
    setCount(prev => prev - 1);
  }, ONE_SECOND);
};

useEffect(() => {
  
}, [])