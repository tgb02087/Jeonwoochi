import styled from 'styled-components';
import tw from 'twin.macro';
import Image from '../atoms/Image';
import Sheet from '../atoms/Sheet';
import Text from '../atoms/Text';

interface PropTypes {
  question: string | undefined;
}
const StyledCharacterQuestion = styled.div`
  ${tw`flex justify-between`}
  width: 100%;
`;
const StyledCharacter = styled.div`
  width: 10%;
`;
const StyledQuestion = styled.div`
  width: 67vw;
`;

/**
 * 관심사 카드 컴포넌트입니다.
 * 클릭하면 clickStates의 값을 토글합니다.
 *
 * @author: jojo
 */
const CharacterQuestion = ({ question }: PropTypes) => {
  console.log(question);

  return (
    <StyledCharacterQuestion>
      <StyledCharacter>
        <Image src="/images/interest/character.png" alt="character" />
      </StyledCharacter>
      <Sheet>
        <StyledQuestion>
          {question ? <Text color="white" message={question} /> : null}
          <Text
            color="white"
            message={'관심사를 선택할 수록 더 정교한 추천이 가능해요'}
          />
        </StyledQuestion>
      </Sheet>
    </StyledCharacterQuestion>
  );
};

export default CharacterQuestion;
