import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import tw from 'twin.macro';
import getFestivalItem from '../../api/getFestivalItem';
import getFestivalList from '../../api/getFestivalList';
import getSelectedFestivals from '../../api/getSelectedFestivals';
import checkLoginState from '../../api/checkLoginState';
import { MapData } from '../../mocks/handlers/festival_list';
import { userInfo, UserInfo } from '../../recoil/atoms/userInfo';
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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const { data: listData } = useQuery(['festivalList'], getFestivalList);

  const [openedSideBar, setOpenedSideBar] = useState(false);
  const [openedFestivalModal, setOpenedFestivalModal] = useState(false);
  const [openedRequestFirstModal, setOpenedRequestFirstModal] = useState(false);
  const [openedRequestSecondModal, setOpenedRequestSecondModal] =
    useState(false);
  const [openedHelpModal, setOpenedHelpModal] = useState(false);

  // sound 음소거 유무 확인용 state
  const [isSound, setIsSound] = useState(true);

  // 로그인 여부 체크 후 받은 사용자 객체를 Recoil에 저장하는 Setter
  const setUserData = useSetRecoilState(userInfo);

  // 현재 진행 중인 축제 중 3개 가져오기
  const { data: selected3 } = useQuery(
    ['selectedFestivals'],
    getSelectedFestivals,
  );
  // 축제 오브젝트에서 Enter 키를 눌렀을 때 축제 페이지가 뜨도록 이벤트 수신
  eventEmitter.on('visit', (festival: MapData) => {
    setFestivalInfo(festival);
    setOpenedFestivalModal(true);
  });

  const soundBtnClickHandler = () => {
    setIsSound(prev => !prev);
  };

  const [user] = useRecoilState(userInfo);
  // console.log(user);

  if (user && localStorage.getItem('isAlreadyJoined') === 'false')
    navigate('/interest');

  useEffect(() => {
    checkLoginState(setUserData);
  }, []);
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
  // 좌표 계속 보내주는 setInterval id 받아 저장
  // MapAPI로 넘어갈 때 clearInterval 실행
  const [intervalId, setIntervalId] = useState(0);
  eventEmitter.once('intervalId', intervalId => {
    setIntervalId(intervalId);
  });

  return (
    <StyledMain>
      <MainFrame>
        <MainHeader
          userInfo={user}
          isSound={isSound}
          soundBtnClickHandler={soundBtnClickHandler}
          setState={setOpenedRequestFirstModal}
          navigate={navigate}
        />
        <MainBody>
          <FestivalSideBar
            openedSideBar={openedSideBar}
            setOpenedSideBar={setOpenedSideBar}
            setFocusedIdx={setFocusedIdx}
            selectedFestivals={selected3}
          />
          <Minimap
            x={location.x}
            y={location.y}
            festivalList={listData}
            focusedIdx={focusedIdx}
            selectedFestivals={selected3}
          />
        </MainBody>
        <MainFooter setOpenedHelpModal={setOpenedHelpModal} />
      </MainFrame>

      {openedFestivalModal ? (
        <FestivalModal
          setState={setOpenedFestivalModal}
          info={festivalInfo}
          intervalId={intervalId}
        />
      ) : null}
      <RequestModalWrapper>
        {/* 나중에 관리자 유무 받아서 여기 false에 넣기 */}
        {openedRequestFirstModal && !user?.isAdmin ? (
          <RequestModal setState={setOpenedRequestFirstModal} />
        ) : null}
        {openedRequestFirstModal &&
        !openedRequestSecondModal &&
        user?.isAdmin ? (
          <RequestListModal
            setState={setOpenedRequestFirstModal}
            setOpenedDetail={setOpenedRequestSecondModal}
          />
        ) : null}
        {!openedRequestFirstModal &&
        openedRequestSecondModal &&
        user?.isAdmin ? (
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
