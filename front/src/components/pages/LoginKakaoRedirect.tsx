import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import qs from 'qs';
import getKakaoAccessToken from '../../api/getKakaoAccessToken';
import getJwtAccessToken from '../../api/getJwtAccessToken';
import checkAuth from '../../api/checkAuth';
import { userInfo } from '../../recoil/atoms/userInfo';

/**
 * 카카오 로그인 리다이렉트 페이지 컴포넌트
 *
 * 쿼리스트링으로 받은 인가 코드를 사용하여 카카오 로그인 마무리 작업 수행 후 메인 페이지로 리다이렉트
 *
 * @author Sckroll
 */
const LoginKakaoRedirect = () => {
  const setUser = useSetRecoilState(userInfo);

  const { code } = qs.parse(new URL(location.href).search, {
    ignoreQueryPrefix: true,
  }) as { code: string };

  useQuery(['accessToken'], async () => {
    const kakaoAccessToken = await getKakaoAccessToken(code);
    await getJwtAccessToken(kakaoAccessToken);
    const data = await checkAuth();

    // 관리자 여부와 같은 사용자 정보 객체를 리코일에 저장
    // 그러면 RouteWrapper에서 정한 것과 같이 자동으로 게임 페이지로 리다이렉트됨
    setUser(data);
  });

  return null;
};

export default LoginKakaoRedirect;
