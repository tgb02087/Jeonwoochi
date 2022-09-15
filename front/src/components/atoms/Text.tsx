import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface PropTypes {
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  message: string;
}

const StyledText = styled.div`
  ${tw`font-DungGeunMo`}
`;

/**
 *
 * @description
 * message props에 텍스트를 적어 보낸다. DungGeunMo 폰트가 자동 적용된다.
 * clickHandler 를 통해 클릭 이벤트 함수르 호출하는 것이 가능하다.
 * @example
 * <Test message={"나 아이폰 샀음"}/>
 *
 */

const Text = ({ message }: PropTypes) => {
  return <StyledText>{message}</StyledText>;
};

export default Text;
