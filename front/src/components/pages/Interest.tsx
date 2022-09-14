import React from 'react';
import Image from '../atoms/Image';
import styled from 'styled-components';

const StyledInterest = styled.div`
  width: 10rem;
  height: 10rem;
  border: 1px solid black;
`;

const Interest = () => {
  return (
    <StyledInterest>
      <Image src="aa" alt="bb" />
    </StyledInterest>
  );
};

export default Interest;
