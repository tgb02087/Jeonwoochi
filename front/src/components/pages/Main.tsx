import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import getFestivalItem from '../../api/getFestivalItem';
import getFestivalList from '../../api/getFestivalList';
import { MapData } from '../../mocks/handlers/festival_list';
import eventEmitter from '../../utils/eventEmitter';
import FestivalModal from '../organisms/FestivalModal';
import FestivalSideBar from '../organisms/FestivalSideBar';
import GameView from '../organisms/GameView';
import MainFooter from '../organisms/MainFooter';
import MainHeader from '../organisms/MainHeader';
import RequestConfirmModal from '../organisms/RequestConfirmModal';
import RequestModal from '../organisms/RequestModal';

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
const RequestModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  ${tw`flex justify-center items-center`}
`;
const Main = () => {
  // 데이터를 초기 렌더링 시 fetch해 가지고 있다가
  // 다른 축제 오브젝트에 접근하면 key만 다르게 해서 다시 fetch 해오기
  // isLoading, isError는 당장 사용하지 않아서 우선 제거했으며,
  // data 이름이 중복되므로 itemData와 listData로 이름을 구분했음
  const { data: itemData } = useQuery(['info'], getFestivalItem, {
    staleTime: 1000 * 20,
  });
  const { data: listData } = useQuery(['festivalList'], getFestivalList, {
    staleTime: 1000 * 20,
  });

  // opened 여부에 따라 화살표 방향, display none 바꿔주기
  const [openedSideBar, setOpenedSideBar] = useState(true);
  const [openedFestivalModal, setOpenedFestivalModal] = useState(false);
  const [openedRequestModal, setOpenedRequestModal] = useState(false);
  const clickHandler = () => {
    setOpenedSideBar(prev => !prev);
  };

  // 축제 오브젝트에서 Enter 키를 눌렀을 때 축제 페이지가 뜨도록 이벤트 수신
  eventEmitter.on('visit', (festival: MapData) => {
    setOpenedFestivalModal(true);
  });

  return (
    <StyledMain>
      <MainFrame>
        <MainHeader isAdmin={true} setState={setOpenedRequestModal} />
        <MainFooter />
      </MainFrame>

      <FestivalSideBar
        openedSideBar={openedSideBar}
        clickHandler={clickHandler}
      />
      {openedFestivalModal ? (
        <FestivalModal setState={setOpenedFestivalModal} info={itemData} />
      ) : null}
      <RequestModalWrapper>
        {/* 나중에 관리자 유무 받아서 여기 false에 넣기 */}
        {openedRequestModal && false ? (
          <RequestModal setState={setOpenedRequestModal} />
        ) : null}
        {openedRequestModal && true ? (
          <RequestConfirmModal setState={setOpenedRequestModal} />
        ) : null}
      </RequestModalWrapper>

      <GameView festivalList={listData} />
    </StyledMain>
  );
};

export default Main;
