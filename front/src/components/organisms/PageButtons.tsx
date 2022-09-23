import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import InterestCard from './InterestCard';

interface PropTypes {
  totalPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
const CenterAlign = styled.div`
  ${tw`flex justify-center`}
  width: 100%;
`;
const StyledPageButtons = styled.div`
  ${tw`flex justify-evenly`}
  width: 30%;
`;

/**
 * 현재 페이지를 알려주고 이전, 다음 페이지로 이동할 수 있게 해주는 컴포넌트입니다.
 *
 * @author: jojo
 */
const PageButtons = ({ totalPage, page, setPage }: PropTypes) => {
  const currPage = page + 1 + ' / ' + totalPage;
  return (
    <CenterAlign>
      <StyledPageButtons>
        <Button isText={true}>
          <Text message="prev" />
        </Button>
        <Text message={currPage} />
        <Button isText={true}>
          <Text message="next" />
        </Button>
      </StyledPageButtons>
    </CenterAlign>
  );
};

export default PageButtons;
