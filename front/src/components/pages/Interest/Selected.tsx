import styled, { css } from 'styled-components';
// import Check from '../../../icons/Check';
import tw from 'twin.macro';

interface PropTypes {
  radius?: number;
}
const StyledSelected = styled.div<PropTypes>`
  ${({ radius }) => css`
    border-radius: ${radius}rem;
  `}
  ${tw`flex justify-center items-center absolute`}
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 88, 0.7);
`;
/**
 * this component cover Interest component when user check it
 * this is a component which is blue colored box with checked Icon.
 *
 * @author jojo
 */
const Selected = ({ radius }: PropTypes) => {
  return <StyledSelected radius={radius}>{/* <Check /> */}</StyledSelected>;
};

export default Selected;
