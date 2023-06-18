import { WORK_TIME } from "../../constants";

const convertTimeToMinutesAndSeconds = (time: number) => {
  let minutes = Math.floor(WORK_TIME / 60);
  let seconds = WORK_TIME % 60;

  return { minutes, seconds };
};

export default convertTimeToMinutesAndSeconds;
