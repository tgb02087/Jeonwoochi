import React from 'react';
import Image from '../atoms/Image';
import styled from 'styled-components';

const StyledInterest = styled.div`
  width: 10rem;
  height: 10rem;
  border: 1px solid black;
  border-radius: 1rem;
`;

const Interest = () => {
  return (
    <StyledInterest>
      <Image
        src="https://pbs.twimg.com/media/FVbDNd0VEAAKmOC.jpg"
        alt="bb"
        radius={1}
      />
    </StyledInterest>
  );
};

export default Interest;
