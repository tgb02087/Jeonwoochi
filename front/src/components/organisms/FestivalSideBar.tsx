import { Dispatch, SetStateAction, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import LeftV from '../../icons/LeftV';
import RightV from '../../icons/RightV';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

interface PropTypes {
  openedSideBar: boolean;
  setOpenedSideBar: Dispatch<SetStateAction<boolean>>;
  setFocusedIdx: Dispatch<SetStateAction<number>>;
}
interface FestivalInfosPropTypes {
  openedSideBar: boolean;
  isClicked?: boolean;
}
const StyledFestivalSideBar = styled.div<FestivalInfosPropTypes>`
  ${tw`flex justify-between`}
  width: 17rem;
  height: 35rem;
  ${({ openedSideBar }) => !openedSideBar && tw`justify-end`}
`;
const ButtonArea = styled.div`
  ${tw`flex items-center`}
`;
const FestivalInfos = styled.div<FestivalInfosPropTypes>`
  ${tw`flex flex-col justify-evenly`}
  width: 12rem;
  height: 35rem;
  transition: all 0.3s;
  ${({ openedSideBar }) =>
    !openedSideBar &&
    css`
      width: 0rem;
    `}
`;
const FestivalInfo = styled.div<FestivalInfosPropTypes>`
  background-color: white;
  box-sizing: border-box; // or content-box
  width: 100%;
  height: 10rem;
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
        <FestivalInfo
          openedSideBar={openedSideBar}
          isClicked={isClicked[0]}
          onClick={() => toggleFocusHandler(0)}
        />
        <FestivalInfo
          openedSideBar={openedSideBar}
          isClicked={isClicked[1]}
          onClick={() => toggleFocusHandler(1)}
        />
        <FestivalInfo
          openedSideBar={openedSideBar}
          isClicked={isClicked[2]}
          onClick={() => toggleFocusHandler(2)}
        />
      </FestivalInfos>
    </StyledFestivalSideBar>
  );
};

export default FestivalSideBar;
