import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import getFestivalItem from '../../api/getFestivalItem';
import getFestivalList from '../../api/getFestivalList';
import { MapData } from '../../mocks/handlers/festival_list';
import eventEmitter from '../../utils/eventEmitter';
import FestivalModal from '../organisms/FestivalModal';
import FestivalSideBar from '../organisms/FestivalSideBar';
import GameView from '../organisms/GameView';
import HelpModal from '../organisms/HelpModal';
import MainFooter from '../organisms/MainFooter';
import MainHeader from '../organisms/MainHeader';
import RequestConfirmModal from '../organisms/RequestConfirmModal';
import RequestListModal from '../organisms/RequestListModal';
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
const MainBody = styled.div`
  ${tw`flex justify-end`}
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
  const { data: itemData } = useQuery(['info'], getFestivalItem);
  const { data: listData } = useQuery(['festivalList'], getFestivalList);

  // opened 여부에 따라 화살표 방향, display none 바꿔주기
  const [openedSideBar, setOpenedSideBar] = useState(true);
  const [openedFestivalModal, setOpenedFestivalModal] = useState(false);
  const [openedRequestFirstModal, setOpenedRequestFirstModal] = useState(false);
  const [openedRequestSecondModal, setOpenedRequestSecondModal] =
    useState(false);
  const [openedHelpModal, setOpenedHelpModal] = useState(false);

  // sound 음소거 유무 확인용 state
  const [isSound, setIsSound] = useState(true);

  const clickHandler = () => {
    setOpenedSideBar(prev => !prev);
  };

  // 축제 오브젝트에서 Enter 키를 눌렀을 때 축제 페이지가 뜨도록 이벤트 수신
  eventEmitter.on('visit', (festival: MapData) => {
    setOpenedFestivalModal(true);
  });

  const soundBtnClickHandler = () => {
    setIsSound(prev => !prev);
  };

  useEffect(() => {
    isSound
      ? eventEmitter.once('bgmOn', () => isSound)
      : eventEmitter.once('bgmOff', () => isSound);
  }, [isSound]);

  return (
    <StyledMain>
      <MainFrame>
        <MainHeader
          isAdmin={!true}
          isSound={isSound}
          soundBtnClickHandler={soundBtnClickHandler}
          setState={setOpenedRequestFirstModal}
        />
        <MainBody>
          <FestivalSideBar
            openedSideBar={openedSideBar}
            clickHandler={clickHandler}
          />
        </MainBody>
        <MainFooter setOpenedHelpModal={setOpenedHelpModal} />
      </MainFrame>

      {openedFestivalModal ? (
        <FestivalModal setState={setOpenedFestivalModal} info={itemData} />
      ) : null}
      <RequestModalWrapper>
        {/* 나중에 관리자 유무 받아서 여기 false에 넣기 */}
        {openedRequestFirstModal && false ? (
          <RequestModal setState={setOpenedRequestFirstModal} />
        ) : null}
        {openedRequestFirstModal && !openedRequestSecondModal && true ? (
          <RequestListModal
            setState={setOpenedRequestFirstModal}
            setOpenedDetail={setOpenedRequestSecondModal}
          />
        ) : null}
        {!openedRequestFirstModal && openedRequestSecondModal && true ? (
          <RequestConfirmModal
            setState={setOpenedRequestSecondModal}
            setOpenedList={setOpenedRequestFirstModal}
          />
        ) : null}
        {openedHelpModal ? <HelpModal setState={setOpenedHelpModal} /> : null}
      </RequestModalWrapper>

      <GameView festivalList={listData} />
    </StyledMain>
  );
};

export default Main;
