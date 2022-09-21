import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import getFestivalItem from '../../api/getFestivalItem';
import FestivalModal from '../organisms/FestivalModal';
import FestivalSideBar from '../organisms/FestivalSideBar';
import GameView from '../organisms/GameView';
import MainFooter from '../organisms/MainFooter';
import MainHeader from '../organisms/MainHeader';

const StyledMain = styled.div`
  height: 95vh;
  ${tw`relative`}
`;
const MainFrame = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1rem;
  ${tw`flex flex-col justify-between absolute`}
`;
const Main = () => {
  // 데이터를 초기 렌더링 시 fetch해 가지고 있다가
  // 다른 축제 오브젝트에 접근하면 key만 다르게 해서 다시 fetch 해오기
  const { data, isLoading, isError } = useQuery(['info'], getFestivalItem, {
    staleTime: 1000 * 20,
  });
  // opened 여부에 따라 화살표 방향, display none 바꿔주기
  const [openedSideBar, setOpenedSideBar] = useState(true);
  // 아래 시작 state 나중에 false로 바꾸기
  const [openedFestivalModal, setOpenedFestivalModal] = useState(true);
  const clickHandler = () => {
    setOpenedSideBar(prev => !prev);
  };

  return (
    <StyledMain>
      <MainFrame>
        <MainHeader isAdmin={false} />
        <MainFooter />
      </MainFrame>

      <FestivalSideBar
        openedSideBar={openedSideBar}
        clickHandler={clickHandler}
      />
      {openedFestivalModal ? (
        <FestivalModal setState={setOpenedFestivalModal} info={data} />
      ) : null}

      <GameView />
    </StyledMain>
  );
};

export default Main;
