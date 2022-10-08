import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface PropTypes {
  id: string;
  setValue?: Dispatch<SetStateAction<string>>;
  height?: number;
}
interface StyltedPropTypes {
  height?: number;
}
const StyledTextarea = styled.textarea<StyltedPropTypes>`
  width: 100%;
  height: ${({ height }) => height}vh;
  padding: 0.5rem 0.5rem;
  resize: none;
  color: black;
  outline: none;
  ${tw`rounded-lg`}
`;

const Textarea = ({ setValue, ...rest }: PropTypes) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue && setValue(e.target.value);
  };
  return <StyledTextarea {...rest} onChange={handleChange} />;
};

Textarea.defaultProps = {
  height: 10,
};

export default Textarea;
