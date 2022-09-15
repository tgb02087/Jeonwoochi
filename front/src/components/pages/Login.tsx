import tw from 'twin.macro';
import styled from 'styled-components';
import LoginForm from '../organisms/LoginForm';

// TODO: 배경 이미지 변경 (현재는 임시로 흑백 그라데이션 적용)
const LoginBackground = styled.div`
  ${tw`flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-gray-500`}
`;

/**
 * 로그인 페이지 컴포넌트
 *
 * @author Sckroll
 */
const Login = () => {
  return (
    <LoginBackground>
      <LoginForm />
    </LoginBackground>
  );
};

export default Login;
