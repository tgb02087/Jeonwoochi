import axios, { HeadersDefaults } from 'axios';

/**
 * 기존 HeadersDefaults 타입에 Authorization 추가
 */
export interface HeaderWithAuthorization extends HeadersDefaults {
  Authorization: string;
}

/**
 * 카카오 로그인 API로부터 받은 인가 코드를 사용하여 로그인을 수행한 후 액세스 토큰을 받는 API
 *
 * @param code 카카오 로그인 API 인가 코드
 * @returns 액세스 토큰
 * @author Sckroll
 */
const getAccessToken = async (code: string) => {
  const {
    data: { accessToken },
  } = await axios({
    method: 'post',
    url: '/user-service/createjwt',
    data: {
      code,
    },
  });

  // Axios 헤더에 액세스 토큰 추가
  (
    axios.defaults.headers as HeaderWithAuthorization
  ).Authorization = `Bearer ${accessToken}`;

  return accessToken;
};

export default getAccessToken;
