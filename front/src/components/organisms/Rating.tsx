import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Star from '../../icons/Star';

const StyledRating = styled.div`
  ${tw`flex`}
`;
const StyledStar = styled.div`
  cursor: pointer;
`;
const Rating = () => {
  const [ratings, setRatings] = useState([false, false, false, false, false]);
  const clickHandler = (idx: number) => {
    setRatings((prev: any) => {
      return prev.map((_: boolean, i: number) => {
        if (i <= idx) {
          return true;
        }
      });
    });
  };
  return (
    <StyledRating>
      {ratings.map((rating, idx) => {
        return rating ? (
          <StyledStar onClick={() => clickHandler(idx)}>
            <Star color="yellow" />
          </StyledStar>
        ) : (
          <StyledStar onClick={() => clickHandler(idx)}>
            <Star />
          </StyledStar>
        );
      })}
    </StyledRating>
  );
};

export default Rating;
