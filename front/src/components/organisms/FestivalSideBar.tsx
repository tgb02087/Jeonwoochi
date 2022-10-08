import { Dispatch, SetStateAction, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import LeftV from '../../icons/LeftV';
import RightV from '../../icons/RightV';
import { MapData } from '../../mocks/handlers/festival_list';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import InterestCard from './InterestCard';

interface PropTypes {
  openedSideBar: boolean;
  setOpenedSideBar: Dispatch<SetStateAction<boolean>>;
  setFocusedIdx: Dispatch<SetStateAction<number>>;
  selectedFestivals: MapData[] | undefined;
}
interface FestivalInfosPropTypes {
  openedSideBar: boolean;
  isClicked?: boolean;
}
const StyledFestivalSideBar = styled.div<FestivalInfosPropTypes>`
  ${tw`flex justify-between`}
  width: 15vw;
  height: 80vh;
  ${({ openedSideBar }) => !openedSideBar && tw`justify-end`}
`;
const ButtonArea = styled.div`
  ${tw`flex items-center`}
`;
const FestivalInfos = styled.div<FestivalInfosPropTypes>`
  ${tw`flex flex-col justify-evenly`}
  width: 10vw;
  transition: all 0.3s;
  ${({ openedSideBar }) =>
    !openedSideBar &&
    css`
      width: 0rem;
    `}
`;
const FestivalInfo = styled.div<FestivalInfosPropTypes>`
  ${tw`relative  flex justify-center items-center`}
  background-color: black;
  box-sizing: border-box; // or content-box;
  width: 100%;
  height: 25vh;
  cursor: pointer;
  ${({ openedSideBar }) =>
    !openedSideBar &&
    css`
      border: none;
    `}
  ${({ isClicked }) =>
    isClicked &&
    css`
      border: 5px solid gold;
    `}
`;
const OpenButton = styled.div`
  ${tw`flex`}
`;

const Shadow = styled.div`
  ${tw`absolute`}
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const StyledText = styled.div<FestivalInfosPropTypes>`
  ${tw`absolute`}
  ${({ openedSideBar }) =>
    !openedSideBar &&
    css`
      display: none;
    `}
`;

/**
 * openedSideBar: 전체 sideBar의 open 여부를 나타냄
 * clickedHandler: 클릭하면 openedSideBar를 토글
 * setFocusedIdx: FestivalInfo를 클릭하면 해당 info의 idx를 focusedIdx로 바꿈
 *
 * @author jojo
 */
const FestivalSideBar = ({
  openedSideBar,
  setOpenedSideBar,
  setFocusedIdx,
  selectedFestivals,
}: PropTypes) => {
  // 현재 3개 info들의 클릭 상태를 배열로 나타냄
  const [isClicked, setIsClicked] = useState([false, false, false]);
  const toggleSideBarHandler = () => {
    // < 버튼이나  > 버튼을 클릭하면 focus, isClicked는 초기화. openedSideBar는 토글함
    setFocusedIdx(-1);
    setIsClicked(prev => {
      return prev.map(_ => {
        return false;
      });
    });
    setOpenedSideBar(prev => !prev);
  };
  const toggleFocusHandler = (idx: number) => {
    // 클릭되어 있는 info를 클릭하면 focus를 -1로 리셋. isClicked는 전부 false 배열로 변경
    if (isClicked[idx]) {
      setFocusedIdx(-1);
      setIsClicked(prev => {
        return prev.map(_ => {
          return false;
        });
      });
    }
    // 클릭되어 있지 않은 info를 클릭하면 focus를 해당 idx로 바꾸고, isClicked도 해당 idx만 true 배열로 바꿈
    else {
      setFocusedIdx(idx);
      setIsClicked(prev => {
        return prev.map((_, i) => {
          if (i === idx) return true;
          return false;
        });
      });
    }
  };
  return (
    <StyledFestivalSideBar openedSideBar={openedSideBar}>
      <ButtonArea>
        <Button clickHandler={toggleSideBarHandler} isText={false}>
          {openedSideBar ? (
            <RightV />
          ) : (
            <OpenButton>
              <LeftV />
              <Text message="현재 진행 중 축제 보기" color="black" />
            </OpenButton>
          )}
        </Button>
      </ButtonArea>
      <FestivalInfos openedSideBar={openedSideBar}>
        {selectedFestivals
          ? selectedFestivals.map((festival: MapData, idx: number) => {
              return (
                <FestivalInfo
                  openedSideBar={openedSideBar}
                  isClicked={isClicked[idx]}
                  onClick={() => toggleFocusHandler(idx)}
                  key={festival.festivalName + idx}
                >
                  <Shadow />
                  <Image src={festival.image} alt={festival.festivalName} />
                  <StyledText openedSideBar={openedSideBar}>
                    <Text message={festival.festivalName} />
                  </StyledText>
                </FestivalInfo>
              );
            })
          : null}
      </FestivalInfos>
    </StyledFestivalSideBar>
  );
};

export default FestivalSideBar;
