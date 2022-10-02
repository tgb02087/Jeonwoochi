import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import getKakaoAccessToken from '../../api/getKakaoAccessToken';
import getJwtAccessToken from '../../api/getJwtAccessToken';

/**
 * 카카오 로그인 리다이렉트 페이지 컴포넌트
 *
 * 쿼리스트링으로 받은 인가 코드를 사용하여 카카오 로그인 마무리 작업 수행 후 메인 페이지로 리다이렉트
 *
 * @author Sckroll
 */
const LoginKakaoRedirect = () => {
  const navigate = useNavigate();

  const { code } = qs.parse(new URL(location.href).search, {
    ignoreQueryPrefix: true,
  }) as { code: string };

  const { data: kakaoAccessToken } = useQuery<string>(
    ['kakaoAccessToken'],
    () => getKakaoAccessToken(code),
  ) as { data: string };

  const { data: jwtAccessToken } = useQuery<string>(
    ['jwtAccessToken'],
    () => getJwtAccessToken(kakaoAccessToken),
    {
      enabled: true,
      refetchInterval: 1000,
      retry: false,
    },
  );

  useEffect(() => {
    if (jwtAccessToken) navigate('/game');
  }, [jwtAccessToken]);

  return null;
};

export default LoginKakaoRedirect;
