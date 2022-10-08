import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

interface PropTypes {
  totalPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pagingColor: string;
}
const CenterAlign = styled.div`
  ${tw`flex justify-center`}
  width: 100%;
`;
const StyledPageButtons = styled.div`
  ${tw`flex justify-evenly items-center`}
  width: 40%;
`;

/**
 * 현재 페이지를 알려주고 이전, 다음 페이지로 이동할 수 있게 해주는 컴포넌트입니다.
 *
 * @author: jojo
 */
const PageButtons = ({ totalPage, page, setPage, pagingColor }: PropTypes) => {
  const clickHandler = (num: number) => {
    if (page + 1 + num < 1 || page + 1 + num > totalPage) return;

    setPage(prev => prev + num);
  };
  const currPage = page + 1 + ' / ' + totalPage;
  return (
    <CenterAlign>
      <StyledPageButtons>
        <Button isText={true} clickHandler={() => clickHandler(-1)}>
          <Text message="prev" color="black" />
        </Button>
        <Text message={currPage} color={pagingColor} />
        <Button isText={true} clickHandler={() => clickHandler(1)}>
          <Text message="next" color="black" />
        </Button>
      </StyledPageButtons>
    </CenterAlign>
  );
};

export default PageButtons;
