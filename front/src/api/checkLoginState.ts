import { SetterOrUpdater } from 'recoil';
import checkAuth from '../api/checkAuth';
import refreshAccessToken from '../api/refreshAccessToken';
import { UserInfo } from '../recoil/atoms/userInfo';

/**
 * 로그인 상태 체크 및 토큰 재발행 API
 *
 * @param setUserData `checkAuth()`로 받은 사용자 데이터를 저장하는 데 사용할 Recoil Setter
 * @author Sckroll
 */
const checkLoginState = async (
  setUserData: SetterOrUpdater<UserInfo | undefined>,
) => {
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

export default checkLoginState;
