import Effect from './Effect';
import Player from './Player';

class Skill extends Phaser.GameObjects.Sprite {
  /** @description 캐릭터 스킬 시전 상태 확인*/
  public isHaste: boolean;
  public isLevitation: boolean;

  /** @description 캐릭터 스킬 사용시 아이콘 */
  public hasteIcon!: Phaser.GameObjects.Sprite;
  public levitationIcon!: Phaser.GameObjects.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string,
  ) {
    super(scene, x, y, texture, frame);
    this.isHaste = false;
    this.isLevitation = false;
  }

  /**
   *
   * @param player {Player} : Player 클래스 데이터
   * @description
   * "현재 시전 상태에 따라 스킬 토글""
   * @description
   * "캐릭터 speed 향상"
   *
   * @author bell
   */
  skillHaste(player: Player): void {
    if (this.isHaste) {
      this.hasteIcon?.destroy();

      // skill off 효과음
      Effect.effectSound(player.scene, 'skill_off', 800, 0.1);
      this.isHaste = false;
    } else {
      this.hasteIcon = new Phaser.GameObjects.Sprite(
        player.scene,
        player.x,
        player.y,
        'items',
        61,
      );

      // skill on 효과음
      Effect.effectSound(player.scene, 'skill_on', 800, 0.1);

      player.scene.add.existing(this.hasteIcon);
      this.isHaste = true;
    }
  }

  /**
   *
   * @param player {Player} : Player 클래스 데이터
   * @description
   * 현재 시전 상태에 따라 스킬 토글
   * @description
   * 캐릭터 바다 collide 제거
   *
   * @author bell
   */
  skilllevitation(player: Player): void {
    const temp = player.scene.physics.world.colliders;

    if (this.isLevitation) {
      // 아이콘 삭제
      this.levitationIcon?.destroy();

      // skill off 효과음
      Effect.effectSound(player.scene, 'skill_off', 800, 0.1);

      // 시전상태 : false
      this.isLevitation = false;

      // 만약 world 라는 이름이 collider가 존재하지 않는 경우에만
      // world collider 생성
      if (!temp.getActive().find(el => el.name == 'world'))
        player.createColliderForLayer();
    } else {
      // 레비테이션 아이콘 생성
      // 스프라이트로 생성하여 x,y 설정 가능하도록
      this.levitationIcon = new Phaser.GameObjects.Sprite(
        this.scene,
        player.x,
        player.y,
        'items',
        56,
      );
      // world collider 제거
      temp.remove(temp.getActive().filter(el => el.name == 'world')[0]);

      // skill on 효과음
      Effect.effectSound(player.scene, 'skill_on', 800, 0.1);

      // scene에 추가
      player.scene.add.existing(this.levitationIcon);
      // 시전상태 : true
      this.isLevitation = true;
    }
  }
}

export default Skill;
