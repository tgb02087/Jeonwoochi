import tw from 'twin.macro';
import styled from 'styled-components';
import Sheet from '../atoms/Sheet';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Image from '../atoms/Image';

const SheetWrapper = styled.section`
  ${tw`flex flex-col gap-2`}
`;

const TempTitle = styled.h1`
  ${tw`text-xl`}
`;

/**
 * 버튼 마우스오버 시 애니메이션 효과로 인해 시트 전체가 움직이는
 * UI적 문제를 해결하기 위해 만든 버튼 컨테이너 컴포넌트
 *
 * (버튼 컴포넌트와 통합하면 어떨까?)
 */
const ButtonContainer = styled.div`
  ${tw`flex flex-col justify-end h-14`}
`;

/**
 * PNG 형식의 아이콘을 32x32로 담기 위한 이미지 컨테이너 컴포넌트
 */
const IconImageContainer = styled.div`
  ${tw`w-8 h-8`}
`;

/**
 * 비회원 로그인 버튼 스타일링 컴포넌트
 */
const GuestButtonContainer = styled.div`
  ${tw`flex justify-center items-center w-full h-8`}
`;

/**
 * 로그인 폼 컴포넌트
 *
 * @author Sckroll
 */
// TODO: 시트 패딩 간격 넓히기
const LoginForm = () => {
  const kakaoLoginHandler = () => {
    console.log('kakao');
  };
  const googleLoginHandler = () => {
    console.log('google');
  };
  const guestLoginHandler = () => {
    console.log('guest');
  };

  return (
    <Sheet transparent>
      <SheetWrapper>
        <TempTitle>전우치 - 전국 우리 지역잔치</TempTitle>
        <ButtonContainer>
          <Button isText color="#fee500" clickHandler={kakaoLoginHandler}>
            <>
              <IconImageContainer>
                <Image
                  src="/images/login/kakao-login-logo.png"
                  alt="Kakao logo"
                />
              </IconImageContainer>
              <Text message="카카오로 로그인하기" color="#000000d9" />
            </>
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button isText color="#ffffff" clickHandler={googleLoginHandler}>
            <>
              <IconImageContainer>
                <Image
                  src="/images/login/google-login-logo.png"
                  alt="Google logo"
                />
              </IconImageContainer>
              <Text message="구글로 로그인하기" />
            </>
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button isText clickHandler={guestLoginHandler}>
            <GuestButtonContainer>
              <Text message="비회원으로 시작하기" />
            </GuestButtonContainer>
          </Button>
        </ButtonContainer>
      </SheetWrapper>
    </Sheet>
  );
};

export default LoginForm;
