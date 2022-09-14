import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface PropTypes {
  type: string;
  placeholder: string;
  name: string;
  accept?: string;
  setValue?: Dispatch<
    SetStateAction<{
      name: string;
      start: string;
      end: string;
      host: string;
      image: string;
    }>
  >;
}

const StyledInput = styled.input<PropTypes>`
  :focus {
    outline: none;
  }
`;

const Input = ({ type, placeholder, name, accept, setValue }: PropTypes) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue &&
      setValue(prev => ({
        ...prev,
        [name]: e.target.value,
      }));
  };
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      name={name}
      accept={accept}
      onChange={changeHandler}
    ></StyledInput>
  );
};

export default Input;
