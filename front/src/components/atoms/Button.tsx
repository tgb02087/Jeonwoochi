import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface PropTypes {
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element;
  isText: boolean;
  color?: string;
}

const StyledButtonText = styled.button`
  ${tw`flex gap-3 items-center py-2 px-4 rounded-lg`}
  ${({ color }) => (color ? `background-color: ${color};` : tw`bg-gray-300`)}

  border-bottom: 4px solid #00000044;

  &:hover {
    border-bottom: 5px solid #00000044;
    filter: brightness(90%);
    transition: all 0.1s;
  }

  &:active {
    border-bottom-width: 1px;
    transition: all 0.1s;
  }
`;

const StyledButtonIcon = styled.button`
  ${tw`flex gap-3 items-center py-2 px-2 rounded-full`}
  ${({ color }) => (color ? `background-color: ${color};` : tw`bg-gray-300`)}

  border-bottom: 4px solid #00000044;

  &:hover {
    border-bottom: 5px solid #00000044;
    filter: brightness(90%);
    transition: all 0.1s;
  }

  &:active {
    border-bottom-width: 2px;
    transition: all 0.1s;
  }
`;

/**
 *
 * @example
 * // 아이콘 버튼인 경우
 * <Button isText={false}>
 *  {<Icon />}
 *</Button>
 * @example
 * // 텍스트 버튼인 경우
 * <Button isText={true}>
 *    {<Text message="아이폰 13" />}
 * </Button>
 *
 * @author bell
 */
const Button = ({
  clickHandler,
  isText,
  children,
  color,
}: PropTypes): JSX.Element => {
  return isText ? (
    <StyledButtonText onClick={clickHandler} color={color}>
      {children}
    </StyledButtonText>
  ) : (
    <StyledButtonIcon onClick={clickHandler} color={color}>
      {children}
    </StyledButtonIcon>
  );
};

export default Button;
