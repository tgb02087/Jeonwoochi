/**
 * @description
 * 게임에 필요한 오디오 파일을 로드하기 위한 클래스
 *
 * @author bell
 */

class Audio {
  static preload(scene: Phaser.Scene, id: string, src: string[]): void {
    scene.load.audio(id, src);
  }
}

export default Audio;
