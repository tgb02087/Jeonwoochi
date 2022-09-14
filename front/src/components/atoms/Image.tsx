import React from 'react';
import styled, { css } from 'styled-components';

interface Info {
  src: string;
  alt: string;
  radius?: number;
}
const StyledImage = styled.img<Info>`
  width: 100%;
  height: 100%;
  ${({ radius }) => css`
    border-radius: ${radius}rem;
  `}
`;
const Image = ({ src, alt, radius }: Info) => {
  return <StyledImage src={src} alt={alt} radius={radius} />;
};

export default Image;
