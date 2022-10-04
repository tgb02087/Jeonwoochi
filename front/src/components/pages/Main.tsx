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
import Minimap from '../organisms/Minimap';
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
  // festivalInfo null로 초기화.
  // 축제 오브젝트에 접근하면 eventEmitter로 해당 오브젝트를 받아 festivalInfo에 저장
  // festivalInfo를 props로 넘겨 FestivalModal 렌더링
  // isLoading, isError는 당장 사용하지 않아서 우선 제거
  const [festivalInfo, setFestivalInfo] = useState<MapData | null>(null);

  const { data: listData } = useQuery(['festivalList'], getFestivalList);
  // console.log(listData);

  // opened 여부에 따라 화살표 방향, display none 바꿔주기
  const [openedSideBar, setOpenedSideBar] = useState(true);
  const [openedFestivalModal, setOpenedFestivalModal] = useState(false);
  const [openedRequestFirstModal, setOpenedRequestFirstModal] = useState(false);
  const [openedRequestSecondModal, setOpenedRequestSecondModal] =
    useState(false);
  const [openedHelpModal, setOpenedHelpModal] = useState(false);

  // sound 음소거 유무 확인용 state
  const [isSound, setIsSound] = useState(true);

  // 축제 오브젝트에서 Enter 키를 눌렀을 때 축제 페이지가 뜨도록 이벤트 수신
  eventEmitter.on('visit', (festival: MapData) => {
    setFestivalInfo(festival);
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

  // FestivalSideBar 세개 중 focus된 것의 idx 값 저장
  // MiniMap에 상태를 넘겨 해당 idx 강조 표시
  const [focusedIdx, setFocusedIdx] = useState(-1);

  // 플레이어의 현재 x, y 좌표값
  const [location, setLocation] = useState({
    x: 0,
    y: 0,
  });
  // BootScene에서 3초마다 플레이어 현재 좌표를 가져와 location을 update한다.
  eventEmitter.on('playerLocation', ({ x, y }) =>
    setLocation(prev => {
      return {
        ...prev,
        x,
        y,
      };
    }),
  );

  return (
    <StyledMain>
      <MainFrame>
        <MainHeader
          isAdmin={true}
          isSound={isSound}
          soundBtnClickHandler={soundBtnClickHandler}
          setState={setOpenedRequestFirstModal}
        />
        <MainBody>
          <FestivalSideBar
            openedSideBar={openedSideBar}
            setOpenedSideBar={setOpenedSideBar}
            setFocusedIdx={setFocusedIdx}
          />
          <Minimap
            x={location.x}
            y={location.y}
            festivalList={listData}
            focusedIdx={focusedIdx}
          />
        </MainBody>
        <MainFooter setOpenedHelpModal={setOpenedHelpModal} />
      </MainFrame>

      {openedFestivalModal ? (
        <FestivalModal setState={setOpenedFestivalModal} info={festivalInfo} />
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
