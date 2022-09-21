import { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Text from '../atoms/Text';

interface PropTypes {
  title: string;
  color: string;
  setState?: Dispatch<SetStateAction<boolean>>;
}
const StyledTitleCancelHeader = styled.div`
  width: 100%;
  ${tw`flex justify-between`}
`;
/**
 * 제목과 취소 버튼이 일렬로 있는 컴포넌트
 *
 * @author jojo
 */
const TitleCancelHeader = ({ title, color, setState }: PropTypes) => {
  const clickHandler = () => {
    setState && setState(prev => !prev);
  };
  return (
    <StyledTitleCancelHeader>
      <Text message={title} color={color} size={1.5} />
      <Text message={'X'} color={color} clickHandler={clickHandler} size={2} />
    </StyledTitleCancelHeader>
  );
};

export default TitleCancelHeader;
