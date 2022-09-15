import React from 'react';
import Image from '../../atoms/Image';
import styled from 'styled-components';
import Input from '../../atoms/Input';
import Selected from './Selected';

const StyledInterest = styled.div`
  width: 10rem;
  height: 10rem;
  border: 1px solid black;
  border-radius: 1rem;
`;

const Interest = () => {
  // const [inputs, setInputs] = useState({
  //   name: '',
  //   start: '',
  //   end: '',
  //   host: '',
  //   image: '',
  // });
  return (
    <>
      <StyledInterest>
        <Selected></Selected>
        <Image
          src="https://pbs.twimg.com/media/FVbDNd0VEAAKmOC.jpg"
          alt="bb"
          radius={1}
        />
      </StyledInterest>
      <Input
        type="text"
        placeholder="fush fush"
        accept="image/*"
        name="ya"
        // setValue={setInputs}
      />
    </>
  );
};

export default Interest;
