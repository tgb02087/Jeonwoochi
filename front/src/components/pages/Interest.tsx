import React, { useState } from 'react';
import Image from '../atoms/Image';
import styled from 'styled-components';
import Input from '../atoms/Input';
import Selected from './Interest/Selected';
import tw from 'twin.macro';

const StyledInterest = styled.div``;
const InterestCard = styled.div`
  width: 10rem;
  height: 10rem;
  border: 1px solid black;
  border-radius: 1rem;
  ${tw`relative`}
`;

const Interest = () => {
  // const [inputs, setInputs] = useState({
  //   name: '',
  //   start: '',
  //   end: '',
  //   host: '',
  //   image: '',
  // });

  // const [isClicked, setIsClicked] = useState(new Array(5).fill(false));
  return (
    <StyledInterest>
      <InterestCard>
        <Selected radius={1} />
        <Image
          src="https://pbs.twimg.com/media/FVbDNd0VEAAKmOC.jpg"
          alt="bb"
          radius={1}
        />
      </InterestCard>
      <Input
        type="text"
        placeholder="fush fush"
        accept="image/*"
        name="ya"
        // setValue={setInputs}
      />
    </StyledInterest>
  );
};

export default Interest;
