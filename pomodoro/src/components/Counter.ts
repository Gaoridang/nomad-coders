const counter = (count: number) => {
  if (count <= 0) {
    return { mintues: 0, seconds: 0 };
  }

  let minutes = Math.floor(count / 60);
  let seconds = count % 60;

  return { minutes, seconds };
};



// const start = useCallback(() => {
//   if (intervalRef.current !== null) return;

//   setRunning(true);

//   intervalRef.current = window.setInterval(() => {
//     setCount((prev) => {
//       if (prev > 0) {
//         return prev - 1;
//       } else {
//         return minutes * 60 + seconds;
//       }
//     });
//   }, 1000);
// }, [minutes, seconds]);
