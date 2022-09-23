import styled, { css } from 'styled-components';
import tw from 'twin.macro';

interface PropTypes {
  children: string;
  href: string;
  color?: string;
  size?: number;
}
interface LinkPropTypes {
  color?: string;
  size?: number;
}

const StyledLink = styled.a<LinkPropTypes>`
  ${tw`font-DungGeunMo`}
  ${({ color }) => (color ? `color: ${color};` : tw`text-black`)}
  ${({ size }) =>
    size &&
    css`
      font-size: ${size}rem;
    `}
`;

/**
 *
 * a 태그를 이용해 만든 컴포넌트입니다.
 *
 * @example
 * <Link href="www.naver.com" color="white" size={1.2}>a tag</Link>
 *
 * @author jojo
 */

const Link = ({ children, href, color, size }: PropTypes) => {
  return (
    <StyledLink href={href} color={color} size={size} target="_blank">
      {children}
    </StyledLink>
  );
};

export default Link;
