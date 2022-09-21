import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

interface PropTypes {
  clickHandler?: React.MouseEventHandler<HTMLDivElement>;
  message: string;
  color?: string;
  size?: number;
}
interface TextPropTypes {
  clickHandler?: React.MouseEventHandler<HTMLDivElement>;
  color?: string;
  size?: number;
}

const StyledText = styled.div<TextPropTypes>`
  ${tw`font-DungGeunMo`}
  ${({ color }) => (color ? `color: ${color};` : tw`text-black`)}
  ${({ size }) =>
    size &&
    css`
      font-size: ${size}rem;
    `}
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
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

const Text = ({ message, clickHandler, color, size }: PropTypes) => {
  return (
    <StyledText onClick={clickHandler} color={color} size={size}>
      {message}
    </StyledText>
  );
};

export default Text;
