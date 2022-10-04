import axios, { HeadersDefaults } from 'axios';

/**
 * 기존 HeadersDefaults 타입에 Authorization 추가
 */
interface HeaderWithAuthorization extends HeadersDefaults {
  Authorization: string;
}

/**
 * 카카오 로그인 액세스 코드를 서버로 전송 후 JWT 액세스 토큰을 받아 헤더에 추가하는 API
 *
 * @param token 카카오 로그인 액세스 토큰
 * @returns JWT 액세스 토큰
 * @author Sckroll
 */
const getJwtAccessToken = async (token: string) => {
  const {
    data: { accessToken },
  } = await axios({
    method: 'get',
    url: 'https://j7b305.p.ssafy.io/api/user-service/login/kakao',
    params: {
      token,
    },
    withCredentials: true,
  });

  // Axios 헤더에 액세스 토큰 추가
  (
    axios.defaults.headers as HeaderWithAuthorization
  ).Authorization = `Bearer ${accessToken}`;

  return accessToken;
};

export default getJwtAccessToken;
