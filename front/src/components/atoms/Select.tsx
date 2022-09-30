import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface PropTypes {
  options?: any;
  defaultValue: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  name: string;
  id: string;
}
const StyledSelect = styled.select`
  ${tw`rounded-lg`}
  width: 100%;
  height: 3vh;
  text-align: center;
  color: black;
  outline: none;
`;

const Select = ({
  options,
  defaultValue,
  value,
  setValue,
  name,
  id,
}: PropTypes) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue && setValue(e.target.value);
  };

  return (
    <StyledSelect onChange={handleChange}>
      <option value="">-- {defaultValue} --</option>
      {options.map((option: string, idx: number) => {
        return <option key={option + idx}>{option}</option>;
      })}
    </StyledSelect>
  );
};

const EXAMPLE_OPTIONS = ['액티비티', '농산물', '유명축제'];

Select.defaultProps = {
  options: EXAMPLE_OPTIONS,
  defaultValue: '축제 카테고리를 선택해주세요',
};

export default Select;
