import { useEffect } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import LoginForm from '../organisms/LoginForm';
import checkLoginState from '../../api/checkLoginState';
import { userInfo } from '../../recoil/atoms/userInfo';

const LoginBackground = styled.div`
  ${tw`relative w-screen h-screen flex justify-center`}
`;

const LoginBackgroundVideoContainer = styled.div`
  ${tw`absolute w-screen h-screen flex justify-center items-center`}
`;

const LoginBackgroundVideo = styled.video`
  transform: scale(1.3);
`;

const JWCTitle = styled.img`
  ${tw`absolute top-16`}
`;

const LoginFormContainer = styled.div`
  ${tw`absolute bottom-32`}
`;

const FooterBar = styled.footer`
  ${tw`absolute bottom-0 w-screen px-4 py-2 bg-black/40 text-white flex justify-between font-DungGeunMo`}
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

  // 마우스 오른쪽 버튼 비활성화
  const onContextMenu = (e: any) => e.preventDefault();

  return (
    <LoginBackground>
      <LoginBackgroundVideoContainer onContextMenu={onContextMenu}>
        <LoginBackgroundVideo
          src="/videos/login-background.mp4"
          autoPlay
          loop
        />
      </LoginBackgroundVideoContainer>
      <JWCTitle
        src="/images/login/logo.png"
        alt="logo"
        onContextMenu={onContextMenu}
      />
      <LoginFormContainer>
        <LoginForm />
      </LoginFormContainer>
      <FooterBar>
        <p>SSAFY 7기 특화 프로젝트 (빅데이터 추천) B305팀</p>
        <p>김강호, 김성찬, 김성훈, 김종현, 석재호, 정제희</p>
      </FooterBar>
    </LoginBackground>
  );
};

export default Login;
