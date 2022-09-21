import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import getFestivalItem from '../../api/getFestivalItem';
import Alert from '../../icons/Alert';
import Profile from '../../icons/Profile';
import Question from '../../icons/Question';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import FestivalModal from '../organisms/FestivalModal';
import FestivalSideBar from '../organisms/FestivalSideBar';
import GameView from '../organisms/GameView';

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
    <>
      <Button isText={false}>
        <Profile />
      </Button>
      <Button isText={false}>
        <Question />
      </Button>
      <Button isText={false}>
        <Alert />
      </Button>
      <Button isText={true}>
        <Text message={'축제 요청'} />
      </Button>

      <FestivalSideBar
        openedSideBar={openedSideBar}
        clickHandler={clickHandler}
      />
      {openedFestivalModal ? (
        <FestivalModal setState={setOpenedFestivalModal} info={data} />
      ) : null}

      <GameView />
    </>
  );
};

export default Main;
