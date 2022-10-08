/**
 * @description
 * 게임에 필요한 Bgm 파일을 로드하기 위한 클래스
 *
 * @author bell
 */

class Bgm {
  static preload(scene: Phaser.Scene, id: string, src: string[]): void {
    scene.load.audio(id, src);
  }
}

export default Bgm;
