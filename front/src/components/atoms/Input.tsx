import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface PropTypes {
  type: string;
  placeholder?: string;
  name: string;
  id?: string;
  accept?: string;
  className?: string;
  value?: any;
  setValue?: Dispatch<
    SetStateAction<{
      festivalName: string;
      startDate: string;
      endDate: string;
      address: string;
      // posterSrc: string;
    }>
  >;
  // | Dispatch<SetStateAction<string>>;
  handleClick?: () => void;
}

const StyledInput = styled.input<PropTypes>`
  :focus {
    outline: none;
  }
  width: 100%;
  color: ${({ type }) => (type === 'file' ? 'white' : 'black')};
  height: 3vh;
  ${tw`rounded-lg`}
`;

const Input = ({
  type,
  placeholder,
  name,
  id,
  accept,
  className,
  value,
  setValue,
  handleClick,
}: PropTypes) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (typeof value === 'string') {
    //   setValue && setValue(e.target.value);
    //   return;
    // }
    setValue &&
      setValue(prev => ({
        ...prev,
        [name]: e.target.value,
      }));
  };
  const clickHandler = () => {
    if (name !== 'address') return;
    handleClick && handleClick();
  };
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      accept={accept}
      className={className}
      value={value?.[name]}
      onChange={changeHandler}
      onClick={clickHandler}
    ></StyledInput>
  );
};

export default Input;
