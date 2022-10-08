import tw from 'twin.macro';
import styled from 'styled-components';

interface SheetInfo {
  children: JSX.Element;
  transparent: boolean; // 반투명 여부
  wide: boolean; // 더 넓은 가장자리까지의 여백 적용 여부
}

const SheetContainer = styled.div<SheetInfo>`
  ${tw`flex border-4 border-white rounded-lg text-white`}
  ${({ wide }) => (wide ? tw`p-8` : tw`p-4`)}
  ${({ transparent }) => (transparent ? tw`bg-primary/75` : tw`bg-primary`)}
`;

/**
 * 다른 컴포넌트를 감싸는 시트 컴포넌트
 *
 * @author Sckroll
 */
const Sheet = ({ children, transparent, wide }: SheetInfo) => {
  return (
    <SheetContainer transparent={transparent} wide={wide}>
      {children}
    </SheetContainer>
  );
};

Sheet.defaultProps = {
  transparent: false,
  wide: false,
};

export default Sheet;
