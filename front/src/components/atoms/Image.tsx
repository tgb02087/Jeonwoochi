import React from 'react';
import styled from 'styled-components';

interface Info {
  src: string;
  alt: string;
}
const StyledImage = styled.img<Info>`
  width: 100%;
  height: 100%;
`;
const Image = ({ src, alt }: Info) => {
  return <StyledImage src={src} alt={alt} />;
};

export default Image;
