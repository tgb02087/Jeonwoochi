import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Selected from './Selected';

interface PropTypes {
  no: number;
  content: string;
  src: string;
  idx: number;
  sIdx: number;
  clickStates: Array<boolean>;
  setClickStates: Dispatch<SetStateAction<Array<boolean>>>;
}
const StyledInterestCard = styled.div`
  width: 15vw;
  border-radius: 1rem;
  ${tw`relative  flex justify-center items-center`}
`;
const StyledText = styled.div`
  ${tw`absolute`}
`;

/**
 * 관심사 카드 컴포넌트입니다.
 * 클릭하면 clickStates의 값을 토글합니다.
 *
 * @author: jojo
 */
const InterestCard = ({
  no,
  content,
  src,
  idx,
  sIdx,
  clickStates,
  setClickStates,
}: PropTypes) => {
  const currIdx = idx * clickStates.length + sIdx;
  const isClicked: boolean = clickStates[currIdx];
  const clickHandler = () => {
    setClickStates(arr =>
      arr.map((curr, _idx) => {
        if (_idx === currIdx) return !curr;
        return curr;
      }),
    );
  };
  return (
    <StyledInterestCard onClick={clickHandler}>
      {isClicked ? <Selected radius={1} /> : null}
      <StyledText>
        <Text message={content} color="white" />
      </StyledText>
      <Image src={src} alt="content" radius={1} no={no} />
    </StyledInterestCard>
  );
};

export default InterestCard;
