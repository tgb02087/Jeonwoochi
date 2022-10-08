import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import InterestCard, { ClickStateTypes } from './InterestCard';

interface AnswerPropTypes {
  answerId: number;
  answer: string;
  image: string;
}
interface PropTypes {
  page: number;
  answers: AnswerPropTypes[];
  clickStates: Array<ClickStateTypes>;
  setClickStates: Dispatch<SetStateAction<Array<ClickStateTypes>>>;
}
const StyledInterestCards = styled.div`
  ${tw`flex justify-between`}
  width: 100%;
`;

/**
 * answers 배열과 현재 페이지 idx를 받아 map으로 해당하는 answer의 값들을
 * 각 InterestCard에 내려보내 주는 컴포넌트입니다.
 *
 * @author: jojo
 */
const InterestCards = ({
  page,
  answers,
  clickStates,
  setClickStates,
}: PropTypes) => {
  // console.log(answers);

  return (
    <StyledInterestCards>
      {answers.map(
        ({ answerId, answer, image }: AnswerPropTypes, idx: number) => (
          <InterestCard
            no={answerId}
            content={answer}
            src={image}
            page={page}
            idx={idx}
            clickStates={clickStates}
            setClickStates={setClickStates}
            key={answerId + answer}
          />
        ),
      )}
    </StyledInterestCards>
  );
};

export default InterestCards;
