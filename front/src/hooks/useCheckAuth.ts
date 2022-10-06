import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import checkAuth from '../api/checkAuth';
import refreshAccessToken from '../api/refreshAccessToken';
import { UserInfo, userInfo } from '../recoil/atoms/userInfo';

const initAuth = async (setUserData: SetterOrUpdater<UserInfo | undefined>) => {
  try {
    // 헤더에 저장한 토큰으로 로그인 여부 확인
    const data = await checkAuth();
    setUserData(data);
  } catch (e) {
    // 헤더에 토큰이 없는 경우 쿠키에 있는 리프레시 토큰으로 토큰 재발행
    await refreshAccessToken();
    const data = await checkAuth();
    setUserData(data);
  }
};

const useCheckAuth = () => {
  const setUserData = useSetRecoilState(userInfo);
  return initAuth(setUserData);
};

export default useCheckAuth;
