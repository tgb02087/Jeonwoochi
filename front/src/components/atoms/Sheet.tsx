import tw from 'twin.macro';
import styled from 'styled-components';

interface SheetInfo {
  children: JSX.Element;
  transparent: boolean;
}

const SheetContainer = styled.div<SheetInfo>`
  ${tw`flex p-4 border-4 border-white rounded-lg text-white`}
  ${({ transparent }) => (transparent ? tw`bg-primary/75` : tw`bg-primary`)}
`;

/**
 * A Sheet component for wrap other components
 *
 * @author Sckroll
 */
const Sheet = ({ children, transparent }: SheetInfo) => {
  return <SheetContainer transparent={transparent}>{children}</SheetContainer>;
};

Sheet.defaultProps = {
  transparent: false,
};

export default Sheet;
