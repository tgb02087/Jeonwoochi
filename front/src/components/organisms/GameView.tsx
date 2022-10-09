import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import config from '../../game/config';
import useGame from '../../game/useGame';
import { MapData } from '../../mocks/handlers/festival_list';
import eventEmitter from '../../utils/eventEmitter';

interface PropTypes {
  festivalList?: MapData[];
}

const GameViewContainer = styled.section`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
`;

/**
 * 게임 화면 뷰 영역 컴포넌트
 *
 * @author Sckroll
 */
const GameView = ({ festivalList }: PropTypes) => {
  // 게임 화면 초기화
  const parentEl = useRef<HTMLDivElement>(null);
  useGame(config, parentEl);
  useEffect(() => {
    eventEmitter.emit('festivals', festivalList);
  }, [festivalList]);

  return (
    <GameViewContainer>
      <div ref={parentEl} className="game-container"></div>
    </GameViewContainer>
  );
};

export default GameView;
