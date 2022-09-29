import styled from 'styled-components';
import tw from 'twin.macro';

interface PropTypes {
  children: string;
  htmlFor: string;
  color?: string;
}
const StyledLabel = styled.label`
  ${tw`font-DungGeunMo`}
  ${({ color }) => (color ? `color: ${color};` : tw`text-black`)}
`;
const Label = ({ children, htmlFor, color }: PropTypes) => {
  return (
    <StyledLabel htmlFor={htmlFor} color={color}>
      {children}
    </StyledLabel>
  );
};

export default Label;
