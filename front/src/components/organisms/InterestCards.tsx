import styled from 'styled-components';
import tw from 'twin.macro';
import Image from '../atoms/Image';
import Selected from '../pages/Interest/Selected';

interface AnswerPropTypes {
  id: number;
  content: string;
  src: string;
}
interface PropTypes {
  idx: number;
  answers: Array<Array<AnswerPropTypes>>;
}
const StyledInterestCards = styled.div``;

const InterestCards = ({ idx, answers }: PropTypes) => {
  return (
    <StyledInterestCards>
      {/* answers[idx].map(({id, content, src}: AnswerPropTypes, aIdx: number) => {
        <Selected radius={1} />
        <Image
          src={src}
          alt="content"
          radius={1}
          id={id}
        />
    }); */}
    </StyledInterestCards>
  );
};

export default InterestCards;
