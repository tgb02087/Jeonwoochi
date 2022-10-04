import axios from 'axios';
import { UserInfo } from './../recoil/atoms/userInfo';

/**
 * 로그인 여부를 확인한 후 id와 관리자 여부를 반환하는 API
 *
 * @returns 사용자의 id와 관리자 여부 상태를 알 수 있는 객체
 * @author Sckroll
 */
const checkAuth = async () => {
  const { data }: { data: UserInfo } = await axios({
    method: 'get',
    url: 'https://j7b305.p.ssafy.io/api/user-service/checkAT',
  });

  return data;
};

export default checkAuth;
