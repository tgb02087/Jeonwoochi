import axios from 'axios';
import qs from 'qs';

/**
 * 카카오 로그인 API로부터 받은 인가 코드를 사용하여 로그인을 수행한 후 액세스 토큰을 받는 API
 *
 * @param code 카카오 로그인 API 인가 코드
 * @returns 카카오 로그인 액세스 토큰
 * @author Sckroll
 */
const getKakaoAccessToken = async (code: string) => {
  const {
    data: { access_token },
  } = await axios({
    method: 'post',
    url: 'https://kauth.kakao.com/oauth/token',
    data: qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_KAKAO_KEY,
      redirect_uri: 'http://localhost:3000/login/kakao',
      client_secret: '653c5c4f76acf44b796a7c0e107d3d6f',
      code,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return access_token;
};

export default getKakaoAccessToken;
