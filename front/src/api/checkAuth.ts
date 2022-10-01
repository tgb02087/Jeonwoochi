import axios from 'axios';

interface TokenCheckResponse {
  id: string;
  isAdmin: boolean;
}

/**
 * 로그인 여부를 확인한 후 id와 관리자 여부를 반환하는 API
 *
 * @returns 사용자의 id와 관리자 여부 상태를 알 수 있는 객체
 * @author Sckroll
 */
const checkAuth = async () => {
  const { data }: { data: TokenCheckResponse } = await axios({
    method: 'get',
    url: '/user-service/chectAT',
  });

  return data;
};

export default checkAuth;
