import { atom } from 'recoil';

export const minutesState = atom<number>({
  key: 'minutes',
  default: 0,
});

export const secondsState = atom<number>({
  key: 'seconds',
  default: 0,
});
