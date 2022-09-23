import { useRef } from 'react';
import styled from 'styled-components';
import config from '../../game/config';
import useGame from '../../game/useGame';

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
const GameView = () => {
  // 게임 화면 초기화
  const parentEl = useRef<HTMLDivElement>(null);
  useGame(config, parentEl);

  return (
    <GameViewContainer>
      <div ref={parentEl} className="game-container"></div>
    </GameViewContainer>
  );
};

export default GameView;
