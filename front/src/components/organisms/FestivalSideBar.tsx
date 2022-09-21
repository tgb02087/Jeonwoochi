import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import LeftV from '../../icons/LeftV';
import RightV from '../../icons/RightV';
import Button from '../atoms/Button';

interface PropTypes {
  openedSideBar: boolean;
  clickHandler: () => void;
}
interface FestivalInfosPropTypes {
  openedSideBar: boolean;
}
const StyledFestivalSideBar = styled.div<FestivalInfosPropTypes>`
  ${tw`flex justify-evenly absolute`}
  width: 17rem;
  height: 35rem;
  top: 20%;
  right: 1rem;
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
  border: 1px solid black;
  width: 100%;
  height: 10rem;
  ${({ openedSideBar }) =>
    !openedSideBar &&
    css`
      border: none;
    `}
`;
const FestivalSideBar = ({ openedSideBar, clickHandler }: PropTypes) => {
  return (
    <StyledFestivalSideBar openedSideBar={openedSideBar}>
      <ButtonArea>
        <Button clickHandler={clickHandler} isText={false}>
          {openedSideBar ? <RightV /> : <LeftV />}
        </Button>
      </ButtonArea>
      <FestivalInfos openedSideBar={openedSideBar}>
        <FestivalInfo openedSideBar={openedSideBar} />
        <FestivalInfo openedSideBar={openedSideBar} />
        <FestivalInfo openedSideBar={openedSideBar} />
      </FestivalInfos>
    </StyledFestivalSideBar>
  );
};

export default FestivalSideBar;
