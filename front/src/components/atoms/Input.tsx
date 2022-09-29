import React, { Dispatch, FocusEventHandler, SetStateAction } from 'react';
import styled from 'styled-components';

interface PropTypes {
  type: string;
  placeholder?: string;
  name: string;
  id?: string;
  accept?: string;
  value: any;
  setValue?: Dispatch<
    SetStateAction<{
      festivalName: string;
      start: string;
      end: string;
      address: string;
      posterSrc: string;
    }>
  >;
  handleClick?: () => void;
}

const StyledInput = styled.input<PropTypes>`
  :focus {
    outline: none;
  }
  width: 100%;
  color: ${({ type }) => (type === 'file' ? 'white' : 'black')};
  height: 3vh;
`;

const Input = ({
  type,
  placeholder,
  name,
  id,
  accept,
  value,
  setValue,
  handleClick,
}: PropTypes) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue &&
      setValue(prev => ({
        ...prev,
        [name]: e.target.value,
      }));
  };
  const clickHandler = () => {
    handleClick && handleClick();
  };
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      accept={accept}
      value={value[name]}
      onChange={changeHandler}
      onClick={clickHandler}
    ></StyledInput>
  );
};

export default Input;
