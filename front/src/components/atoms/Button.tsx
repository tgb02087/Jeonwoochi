import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface PropTypes {
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element;
  isText: boolean;
}

const StyledButtonText = styled.button`
  ${tw`bg-gray-200 hover:bg-gray-300 hover:text-white py-2 px-4 rounded-lg`}

  display: inline-block;
  box-shadow: 0 3px 0px #c7c7c7;

  &:hover {
    box-shadow: 0 3px 0px #c7c7c7;
    border-bottom: 2px solid #c7c7c7;
    transition: all 0.1s ease-in;
  }

  &:active {
    transform: translateY(4px);
    border-bottom-width: 2px;
    box-shadow: none;
  }
`;

const StyledButtonIcon = styled.button`
  ${tw`bg-gray-200 hover:bg-gray-300 hover:text-white py-2 px-2 rounded-full`}

  display: inline-block;
  box-shadow: 0 3px 0px #c7c7c7;

  &:hover {
    box-shadow: 0 3px 0px #c7c7c7;
    border-bottom: 2px solid #c7c7c7;
    transition: all 0.1s ease-in;
  }

  &:active {
    transform: translateY(4px);
    border-bottom-width: 2px;
    box-shadow: none;
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
const Button = ({ clickHandler, isText, children }: PropTypes): JSX.Element => {
  return isText ? (
    <StyledButtonText className="" onClick={clickHandler}>
      {children}
    </StyledButtonText>
  ) : (
    <StyledButtonIcon className="" onClick={clickHandler}>
      {children}
    </StyledButtonIcon>
  );
};

export default Button;
