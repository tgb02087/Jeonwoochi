import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface PropTypes {
  clickHandler?: React.MouseEventHandler<HTMLDivElement>;
  message: string;
  color?: string;
}

const StyledText = styled.div`
  ${tw`font-DungGeunMo`}
  ${({ color }) => (color ? `color: ${color};` : tw`text-black`)}
`;

/**
 *
 * @description
 * message props에 텍스트를 적어 보낸다. 검정색 DungGeunMo 폰트가 자동 적용된다.
 * clickHandler 를 통해 클릭 이벤트 함수르 호출하는 것이 가능하다.
 * @example
 * <Test message={"나 아이폰 샀음"}/>
 *
 * @author bell
 */

const Text = ({ message, clickHandler, color }: PropTypes) => {
  return (
    <StyledText onClick={clickHandler} color={color}>
      {message}
    </StyledText>
  );
};

export default Text;
