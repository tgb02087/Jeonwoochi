import { Types } from 'phaser';
import BootScene from './BootScene';

/**
 * Phaser 환경 설정 객체
 *
 * @author Sckroll
 */
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  // zoom: 2,  // 타일 배율 설정
  // pixelArt: false, // 타일 배율 증가 시 도트에 블러 처리
  parent: 'app',
  physics: {
    default: 'arcade', // Arcade Physics(AP)
    arcade: {
      gravity: { y: 0 }, // 중력 없음
    },
  },
  // 임시 추가
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH
  // },
  // render: {
  //   antialias: false,
  //   pixelArt: true,
  //   roundPixels: true
  // },
  scene: BootScene,
};

export default config;
