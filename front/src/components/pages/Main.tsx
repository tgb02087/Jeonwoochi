import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import getFestivalItem from '../../api/getFestivalItem';
import getFestivalList from '../../api/getFestivalList';
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
  // isLoading, isError는 당장 사용하지 않아서 우선 제거했으며,
  // data 이름이 중복되므로 itemData와 listData로 이름을 구분했음
  const { data: itemData } = useQuery(['info'], getFestivalItem, {
    staleTime: 1000 * 20,
  });
  // 근데 첫 번째 인자로 들어가는 키 값은 이렇게 써도 되는 건가?
  const { data: listData } = useQuery(['festivalList'], getFestivalList, {
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
        <FestivalModal setState={setOpenedFestivalModal} info={itemData} />
      ) : null}

      <GameView festivalList={listData} />
    </StyledMain>
  );
};

export default Main;
