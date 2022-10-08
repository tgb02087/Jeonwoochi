import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface ObjectTypes {
  id: number;
  name: string;
}
interface PropTypes {
  options: [ObjectTypes];
  defaultValue: ObjectTypes;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
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
    let selectedId = 0;
    options.forEach((option: any) => {
      if (option.name === e.target.value) selectedId = option.id;
    });
    setValue && setValue(selectedId);
  };

  return (
    <StyledSelect onChange={handleChange}>
      <option value={defaultValue.id}>-- {defaultValue.name} --</option>
      {options.map((option, idx) => {
        return <option key={option.name + idx}>{option.name}</option>;
      })}
    </StyledSelect>
  );
};

const EXAMPLE_OPTIONS = [
  { id: 1, name: '액티비티' },
  { id: 2, name: '농산물' },
  { id: 3, name: '유명축제' },
];

Select.defaultProps = {
  options: EXAMPLE_OPTIONS,
  defaultValue: { id: 0, name: '축제 카테고리를 선택해주세요' },
};

export default Select;
