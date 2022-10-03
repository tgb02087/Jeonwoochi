import { atom } from 'recoil';

export interface UserInfo {
  id: number;
  isAdmin: boolean;
}

export const userInfo = atom<UserInfo | undefined>({
  key: 'userInfo',
  default: undefined,
});
