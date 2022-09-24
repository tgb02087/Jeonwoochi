import { atom } from 'recoil';

export const festivalList = atom({
  key: 'festivalList',
  default: [
    {
      name: 'test',
      lan: 36,
      lon: 126,
    },
  ],
});
