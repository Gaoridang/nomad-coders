import { atom } from 'recoil';

export const minutesState = atom({
  key: 'minutes',
  default: 25,
});

export const secondsState = atom({
  key: 'seconds',
  default: 0,
});

export const countMinState = atom({
  key: 'countMin',
  default: 0,
});

export const countSecState = atom({
  key: 'countSec',
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
