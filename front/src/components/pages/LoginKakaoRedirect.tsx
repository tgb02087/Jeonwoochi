import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import getAccessToken from '../../api/getAccessToken';

/**
 * 카카오 로그인 리다이렉트 페이지 컴포넌트
 *
 * 쿼리스트링으로 받은 인가 코드를 사용하여 카카오 로그인 마무리 작업 수행 후 메인 페이지로 리다이렉트
 *
 * @author Sckroll
 */
const LoginKakaoRedirect = () => {
  const navigate = useNavigate();

  const { code }: { code?: string } = qs.parse(new URL(location.href).search, {
    ignoreQueryPrefix: true,
  });

  const accessToken = useQuery(['accessToken'], () =>
    getAccessToken(code ?? ''),
  );
  useEffect(() => {
    navigate('/game');
  }, [accessToken]);

  return null;
};

export default LoginKakaoRedirect;
