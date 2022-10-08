/**
 * @description
 * 게임에 필요한 Effect 파일을 로드하기 위한 클래스
 *
 * @author bell
 */

class Effect {
  static preload(scene: Phaser.Scene, id: string, src: string[]): void {
    scene.load.audio(id, src);
  }

  /**
   * @param Scene {Phaser.scene} - Player 가 가진 Scene
   * @param skillId {string} - load 한 skill의 참조값
   * @param ms {number} - 삭제 시 setTimeout 값 조정
   * @param volume {number} - 오디오 볼륨 조정
   *
   * @author bell
   */
  static effectSound(
    scene: Phaser.Scene,
    skillId: string,
    ms?: number | 1000,
    volume?: number | 0.2,
  ): void {
    if (scene.sound.getAll(skillId).length > 0) return;

    const sound = scene.sound.add(skillId, {
      volume,
    });
    sound.play();
    setTimeout(() => {
      scene.sound.remove(sound);
    }, ms);
  }
}

export default Effect;
