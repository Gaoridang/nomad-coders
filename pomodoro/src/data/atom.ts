import { atom } from 'recoil';

export const minutesState = atom({
  key: 'minutes',
  default: 25,
});

export const secondsState = atom({
  key: 'seconds',
  default: 0,
});

export const roundState = atom({
  key: 'rounds',
  default: 0,
});

export const goalState = atom({
  key: 'goals',
  default: 0,
});

export const idState = atom<number | null>({
  key: 'id',
  default: 0,
});
