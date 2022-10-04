import axios, { HeadersDefaults } from 'axios';

/**
 * 기존 HeadersDefaults 타입에 Authorization 추가
 */
interface HeaderWithAuthorization extends HeadersDefaults {
  Authorization: string;
}

/**
 * 액세스 토큰이 만료되었는지 확인 후 리프레시 토큰을 통해 토큰을 재생성 & 업데이트하는 API
 *
 * 리프레시 토큰도 만료된 경우 로그인을 유도하도록 예외 처리
 *
 * @returns 업데이트된 액세스 토큰
 * @author Sckroll
 */
const refreshAccessToken = async () => {
  const {
    data: { accessToken },
  } = await axios({
    method: 'get',
    url: 'https://j7b305.p.ssafy.io/api/user-service/recreatejwt',
  });

  // Axios 헤더에 액세스 토큰 추가
  (
    axios.defaults.headers as HeaderWithAuthorization
  ).Authorization = `Bearer ${accessToken}`;

  return accessToken;
};

export default refreshAccessToken;
