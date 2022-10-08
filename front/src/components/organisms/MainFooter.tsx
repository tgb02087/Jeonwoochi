import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Question from '../../icons/Question';
import Button from '../atoms/Button';

interface PropTypes {
  // isAdmin: boolean;
  setOpenedHelpModal: Dispatch<SetStateAction<boolean>>;
}
const StyledMainFooter = styled.div`
  ${tw`flex justify-between`}
  width: 100%;
`;
const Left = styled.div`
  ${tw`flex`}
  gap: 1rem;
`;
const Right = styled.div``;

/**
 * Main 페이지의 Footer 요소들을 렌더링하는 컴포넌트입니다.
 * Left와 Right으로 나눴습니다.
 * Left에는 미니맵(예정)과 Right에는 도움말 버튼이 렌더링됩니다.
 *
 * @author: jojo
 */
const MainFooter = ({ setOpenedHelpModal }: PropTypes) => {
  const clickHandler = () => {
    // 도움말 모달 활성화
    setOpenedHelpModal(prev => !prev);
  };
  return (
    <StyledMainFooter>
      <Left>{/* 이 자리에 mini map 예정 */}</Left>
      <Right>
        <Button clickHandler={clickHandler} isText={false}>
          <Question />
        </Button>
      </Right>
    </StyledMainFooter>
  );
};

export default MainFooter;
