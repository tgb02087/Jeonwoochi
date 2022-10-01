import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Alert from '../../icons/Alert';
import Profile from '../../icons/Profile';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

interface PropTypes {
  isAdmin: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}
const StyledMainHeader = styled.div`
  ${tw`flex justify-between`}
  width: 100%;
`;
const LeftButtons = styled.div`
  ${tw`flex`}
  gap: 1rem;
`;
const RightButton = styled.div``;

/**
 * Main 페이지의 Header 버튼들을 렌더링하는 컴포넌트입니다.
 * Left와 Right으로 나눴습니다.
 *
 * @author: jojo
 */
const MainHeader = ({ isAdmin, setState }: PropTypes) => {
  const clickHandler = (isAdmin: boolean) => {
    // 로그인 안한 guest면 로그인이 필요한 서비스라고 alert
    // alert("!!");

    setState(prev => !prev);
    // admin이면 관리자 모달 열고
    // if (isAdmin) {
    // }
    // user면 축제 요청 모달 열기
    // else {
    // }
  };
  return (
    <StyledMainHeader>
      <LeftButtons>
        <Button isText={false}>
          <Profile />
        </Button>
        <Button isText={false}>
          <Alert />
        </Button>
      </LeftButtons>
      <RightButton>
        {isAdmin ? (
          <Button clickHandler={() => clickHandler(isAdmin)} isText={true}>
            <Text message={'축제 요청 확인'} color="black" />
          </Button>
        ) : (
          <Button clickHandler={() => clickHandler(isAdmin)} isText={true}>
            <Text message={'축제 요청'} color="black" />
          </Button>
        )}
      </RightButton>
    </StyledMainHeader>
  );
};

export default MainHeader;
