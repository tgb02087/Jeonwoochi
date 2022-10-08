import { useEffect } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import LoginForm from '../organisms/LoginForm';
import checkLoginState from '../../api/checkLoginState';
import { userInfo } from '../../recoil/atoms/userInfo';

const LoginBackground = styled.div`
  ${tw`flex justify-center items-center h-screen`}
  background-image: url(/images/login/background.gif);
  background-size: 100vw;
`;

/**
 * 로그인 페이지 컴포넌트
 *
 * @author Sckroll
 */
const Login = () => {
  const setUserData = useSetRecoilState(userInfo);

  useEffect(() => {
    checkLoginState(setUserData);
  }, []);

  return (
    <LoginBackground>
      <LoginForm />
    </LoginBackground>
  );
};

export default Login;
