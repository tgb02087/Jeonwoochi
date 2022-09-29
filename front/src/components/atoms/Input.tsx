import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface PropTypes {
  type: string;
  placeholder?: string;
  name: string;
  id?: string;
  accept?: string;
  setValue?: Dispatch<
    SetStateAction<{
      festivalName: string;
      start: string;
      end: string;
      host: string;
      posterSrc: string;
    }>
  >;
}

const StyledInput = styled.input<PropTypes>`
  :focus {
    outline: none;
  }
  width: 100%;
  color: black;
  color: ${({ type }) => (type === 'file' ? 'white' : 'black')};
  height: 3vh;
`;

const Input = ({
  type,
  placeholder,
  name,
  id,
  accept,
  setValue,
}: PropTypes) => {
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
      id={id}
      accept={accept}
      onChange={changeHandler}
    ></StyledInput>
  );
};

export default Input;
