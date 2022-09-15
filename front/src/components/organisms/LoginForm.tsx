import tw from 'twin.macro';
import styled from 'styled-components';
import Sheet from '../atoms/Sheet';
import Button from '../atoms/Button';

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
  ${tw`flex flex-col justify-end h-12`}
`;

/**
 * 로그인 폼 컴포넌트
 *
 * (현재 작업 중인 브랜치에 Text 컴포넌트거 없어서 임시로 div 태그 생성 후 텍스트를 삽입했음)
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
          <Button isText clickHandler={kakaoLoginHandler}>
            <div>카카오로 로그인하기</div>
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button isText clickHandler={googleLoginHandler}>
            <div>구글로 로그인하기</div>
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button isText clickHandler={guestLoginHandler}>
            <div>비회원으로 시작하기</div>
          </Button>
        </ButtonContainer>
      </SheetWrapper>
    </Sheet>
  );
};

export default LoginForm;
