import styled, { css } from 'styled-components';
import Check from '../../../Icons/Check';

interface PropTypes {
  radius?: number;
}
const StyledSelected = styled.div<PropTypes>`
  ${({ theme }) => theme.flex.rowCenter}
  ${({ radius }) => css`
    border-radius: ${radius}rem;
  `}
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 88, 0.7);
  position: absolute;
`;
/**
 * this component cover Interest component when user check it
 * this is a component which is blue colored box with checked Icon.
 *
 * @author jojo
 */
const Selected = ({ radius }: PropTypes) => {
  return (
    <StyledSelected radius={radius}>
      <Check />
    </StyledSelected>
  );
};

export default Selected;
