import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import InterestCard from './InterestCard';

interface AnswerPropTypes {
  no: number;
  content: string;
  src: string;
}
interface PropTypes {
  idx: number;
  answers: Array<Array<AnswerPropTypes>>;
  clickStates: Array<boolean>;
  setClickStates: Dispatch<SetStateAction<Array<boolean>>>;
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
  idx,
  answers,
  clickStates,
  setClickStates,
}: PropTypes) => {
  return (
    <StyledInterestCards>
      {answers[idx].map(
        ({ no, content, src }: AnswerPropTypes, sIdx: number) => (
          <InterestCard
            no={no}
            content={content}
            src={src}
            idx={idx}
            sIdx={sIdx}
            clickStates={clickStates}
            setClickStates={setClickStates}
            key={no + content + src}
          />
        ),
      )}
    </StyledInterestCards>
  );
};

export default InterestCards;
