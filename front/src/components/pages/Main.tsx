import { useState } from 'react';
import Alert from '../../icons/Alert';
import Profile from '../../icons/Profile';
import Question from '../../icons/Question';
import Button from '../atoms/Button';
import GameView from '../organisms/GameView';
import Text from '../atoms/Text';
import FestivalSideBar from '../organisms/FestivalSideBar';

const Main = () => {
  // opened 여부에 따라 화살표 방향, display none 바꿔주기
  const [openedSideBar, setOpenedSideBar] = useState(true);
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

      <GameView />
    </>
  );
};

export default Main;
