import React, { useState } from 'react';
import Image from '../atoms/Image';
import styled from 'styled-components';
import Input from '../atoms/Input';
import Selected from './Interest/Selected';
import tw from 'twin.macro';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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

  // const [isClicked, setIsClicked] = useState(new Array(20).fill(false));
  const { data, isLoading, isError } = useQuery(
    ['answers'],
    async () => {
      const {
        data: { answer },
      } = await axios({
        method: 'GET',
        url: '/interest-service/answer',
      });
      return answer;
    },
    {},
  );
  if (isLoading) return <div>Loading...</div>;
  console.log(data);

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
