import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { interestLen } from '../../utils/interestsLen';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Selected from './Selected';

export interface ClickStateTypes {
  isClicked: boolean;
  id: number;
}
interface PropTypes {
  no: number;
  content: string;
  src: string;
  page: number;
  idx: number;
  clickStates: Array<ClickStateTypes>;
  setClickStates: Dispatch<SetStateAction<Array<ClickStateTypes>>>;
}
const StyledInterestCard = styled.div`
  width: 15vw;
  height: 15vw;
  border-radius: 1rem;
  cursor: pointer;
  ${tw`relative  flex justify-center items-center`}
`;
const StyledText = styled.div`
  ${tw`absolute`}
  z-index:1;
`;

const Shadow = styled.div`
  ${tw`absolute`}
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
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
  page,
  idx,
  clickStates,
  setClickStates,
}: PropTypes) => {
  const len = interestLen[page];
  const currIdx = len + idx;

  const isClicked: boolean = clickStates[currIdx].isClicked;
  const clickHandler = () => {
    setClickStates(arr =>
      arr.map(({ isClicked, id }: ClickStateTypes, _idx) => {
        if (_idx === currIdx)
          return {
            isClicked: !isClicked,
            id: no,
          };
        return {
          isClicked,
          id,
        };
      }),
    );
  };
  return (
    <StyledInterestCard onClick={clickHandler}>
      {isClicked ? <Selected radius={1} /> : null}
      <StyledText>
        <Text message={content} color="white" size={1.5} />
      </StyledText>
      <Image src={src} alt={content} radius={1} no={no} />
      <Shadow />
    </StyledInterestCard>
  );
};

export default InterestCard;
