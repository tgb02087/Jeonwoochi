import { useState, useEffect } from 'react';
import { Types, Game } from 'phaser';

/**
 * 설정 값과 게임 화면을 표시할 요소를 파라미터로 받아서 게임을 실행하는 훅
 *
 * @see https://stackblitz.com/edit/react-phaser-xuskfv?file=hooks%2FuseGame.ts
 *
 * @author Sckroll
 */
const useGame = (
  config: Types.Core.GameConfig,
  containerRef: React.RefObject<HTMLDivElement>,
): Game | undefined => {
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    if (!game && containerRef.current) {
      // Phaser 게임 인스턴스 생성
      const newGame = new Game({
        ...config,
        parent: containerRef.current,
      });
      setGame(newGame);
    }

    return () => {
      game?.destroy(true);
    };
  }, [config, game, containerRef]);

  return game;
};

export default useGame;
