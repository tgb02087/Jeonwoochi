import Effect from './Effect';
import Mana from './Mana';
import Skill from './Skill';

/**
 * @class
 * 캐릭터 클래스
 *
 * @extends {Phaser.Physics.Arcade.Sprite}
 *
 * @constructor
 * @param {Phaser.scene} scene - 띄울 맵,
 * @param {number} x - spawn x좌표,
 * @param {number} y - spawn y좌표,
 * @param {string} texture - 이미지 참조 key,
 * @param {string} frame - 등장시 처음 보일 atlas.json의 이미지 세팅값
 *
 * @author bell
 */
class Player extends Phaser.Physics.Arcade.Sprite {
  /** @description typescript 에러 방지 Body - Sprite의 경우 반드시 Body: body 값을 지니고 있어야 한다. 따라서 public */
  public body: Phaser.Physics.Arcade.Body;
  public scene: Phaser.Scene;
  /** @description 주요 객체 값 저장, constructor에서 생성된 후, update에서도 사용되기 때문 */
  public me: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  /** @description 캐릭터 키 이벤트 설정 - 캐릭터 이동, 스킬 */
  private inputKeys: any;

  // /** @description 캐릭터 스킬 시전 상태 확인*/
  // public isHaste: boolean;
  // public isLevitation: boolean;

  // /** @description 캐릭터 스킬 사용시 아이콘 */
  // public hasteIcon!: Phaser.GameObjects.Sprite;
  // public levitationIcon!: Phaser.GameObjects.Sprite;

  private skill: Skill;

  /** @description 스킬 레비테이션 한정 - collider 해제 할 레이어 */
  private layer!: Phaser.Tilemaps.TilemapLayer;

  /** @description 캐릭터 마나 창 */
  private mana!: Mana;

  /** @description 스킬 파티클 이펙트 */
  private hasteParticles!: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private levitationParticles!: Phaser.GameObjects.Particles.ParticleEmitterManager;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string,
    layer: Phaser.Tilemaps.TilemapLayer,
  ) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.layer = layer;

    // sprite 생성 및 설정
    this.me = this.scene.physics.add
      .sprite(x, y, texture, frame)
      .setSize(30, 40)
      .setOffset(0, 24);

    this.body = this.me.body;

    // 기본 collider 생성
    this.createColliderForLayer();

    // 스킬 생성
    this.skill = new Skill(scene, x, y, frame, texture);

    // 마나 생성
    this.mana = new Mana(scene, x, y);

    // 애니메이션 설정
    const anims = this.me.anims;
    anims.create({
      key: 'player-left-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'player-left-walk.',
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'player-right-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'player-right-walk.',
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'player-front-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'player-front-walk.',
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'player-back-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'player-back-walk.',
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // 방향키 설정
    this.inputKeys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      // shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      // riding: Phaser.Input.Keyboard.KeyCodes.C,
    });

    this.scene.input.keyboard.on('keydown-' + 'Z', () =>
      this.skill.skillHaste(this),
    );
    this.scene.input.keyboard.on('keydown-' + 'X', () =>
      this.skill.skilllevitation(this),
    );

    // 파티클 이펙트 초기화
    this.hasteParticles = this.scene.add.particles('skills');
    this.levitationParticles = this.scene.add.particles('skills');
  }

  static preload(scene: Phaser.Scene): void {
    scene.load.atlas(
      'atlas',
      '/images/map/player-sprite.png',
      '/images/map/player-atlas.json',
    );
    scene.load.spritesheet('items', '/images/items/items.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    scene.load.atlas(
      'skills',
      'https://labs.phaser.io/assets/particles/flares.png',
      'https://labs.phaser.io/assets/particles/flares.json',
    );
  }

  update(): void {
    // 기본
    let speed = 200;
    if (this.skill.isHaste) {
      speed = 750;
    } else {
      speed = 200;
    }
    // Shift 키를 누르면서 이동하면 빠르게 이동
    // if (this.inputKeys.shift.isDown) speed = 350;
    // else speed = 175;

    // if (this.inputKeys.riding.isDown) {
    //   this.skillHaste();
    // }
    const prevVelocity = this.body.velocity.clone();
    // 이전 프레임의 속도를 0으로 설정
    this.body.setVelocity(0);
    // 좌우 이동
    if (this.inputKeys.left.isDown) {
      this.body.setVelocityX(-speed);
    } else if (this.inputKeys.right.isDown) {
      this.body.setVelocityX(speed);
    }
    // 상하 이동
    if (this.inputKeys.up.isDown) {
      this.body.setVelocityY(-speed);
    } else if (this.inputKeys.down.isDown) {
      this.body.setVelocityY(speed);
    }

    // 스킬
    // 스킬 아이콘 및 마나창에도 x,y가 적용되도록
    // 마나가 0 이면 강제 해제
    // 사운드 추가
    if (this.mana.value === 0) {
      this.skill.isHaste = false;
      this.skill.isLevitation = false;

      const temp = this.scene.physics.world.colliders;
      if (!temp.getActive().find(el => el.name == 'world'))
        this.createColliderForLayer();

      Effect.effectSound(this.scene, 'skill_off');

      this.skill.levitationIcon?.destroy();
      this.skill.hasteIcon?.destroy();

      this.hasteParticles.emitters.removeAll();
      this.levitationParticles.emitters.removeAll();
    }

    if (this.skill.isHaste) {
      this.skill.hasteIcon.x = this.me.x - 10;
      this.skill.hasteIcon.y = this.me.y - 45;
      this.mana.decrease();

      this.hasteParticles
        .createEmitter({
          x: this.me.x,
          y: this.me.y,
          speed: 300,
          blendMode: 'SCREEN',
          alpha: 0.5,
          scale: {
            min: 0.1,
            max: 0.5,
          },
          frame: ['red'],
        })
        .explode(5, this.me.x, this.me.y);
    }

    if (this.skill.isLevitation) {
      this.skill.levitationIcon.x = this.me.x + 10;
      this.skill.levitationIcon.y = this.me.y - 45;
      this.mana.decrease();

      this.levitationParticles
        .createEmitter({
          x: this.me.x,
          y: this.me.y,
          speed: 300,
          blendMode: 'SCREEN',
          alpha: 0.6,
          scale: {
            min: 0.1,
            max: 0.5,
          },
          lifespan: 500,
          frame: ['blue'],
        })
        .explode(5, this.me.x, this.me.y);
    }

    if (!this.skill.isHaste && !this.skill.isLevitation) {
      this.mana.increase();

      this.hasteParticles.emitters.removeAll();
      this.levitationParticles.emitters.removeAll();
    }

    // console.log(this.mana);
    // this.mana.x = this.me.x;
    // this.mana.y = this.me.y - 20;
    if (this.mana.bar) {
      this.mana.bar.x = this.me.x - 40;
      this.mana.bar.y = this.me.y - 30;
    }

    // 대각선으로 이동 시 속도 조절을 위해 속도 정규화(normalize) & 크기 조정(scale)
    this.body.velocity.normalize().scale(speed);
    // 애니메이션 업데이트 (상하 이동보다 좌우 이동을 우선시)
    // 사운드도 함께 반영
    // 일반 걷기의 경우 일반 걷기 사운드
    // 헤이스트의 경우, 바람을 가르는 사운드
    if (this.inputKeys.left.isDown) {
      this.me.anims.play('player-left-walk', true);
      this.isHasteSound();
    } else if (this.inputKeys.right.isDown) {
      this.me.anims.play('player-right-walk', true);
      this.isHasteSound();
    } else if (this.inputKeys.up.isDown) {
      this.me.anims.play('player-back-walk', true);
      this.isHasteSound();
    } else if (this.inputKeys.down.isDown) {
      this.me.anims.play('player-front-walk', true);
      this.isHasteSound();
    } else {
      this.me.anims.stop();

      // 이동 중이라면, 사용할 프레임 선택 & 유휴(idle) 상태로 전환\
      if (prevVelocity.x < 0) this.me.setTexture('atlas', 'player-left');
      else if (prevVelocity.x > 0) this.me.setTexture('atlas', 'player-right');
      else if (prevVelocity.y < 0) this.me.setTexture('atlas', 'player-back');
      else if (prevVelocity.y > 0) this.me.setTexture('atlas', 'player-front');
    }
  }

  /**
   *
   * @description
   * "현재 시전 상태에 따라 스킬 토글""
   * @description
   * "캐릭터 speed 향상"
   *
   * @author bell
   */
  // skillHaste(): void {
  //   if (this.isHaste) {
  //     this.hasteIcon?.destroy();

  //     // skill off 효과음
  //     this.effectSound('skill_off', 800, 0.1);
  //     this.isHaste = false;
  //   } else {
  //     this.hasteIcon = new Phaser.GameObjects.Sprite(
  //       this.scene,
  //       this.me.x,
  //       this.me.y,
  //       'items',
  //       61,
  //     );
  //     // this.me.y -= 10;
  //     this.hasteIcon.y -= 45;

  //     // skill on 효과음
  //     this.effectSound('skill_on', 800, 0.1);

  //     this.scene.add.existing(this.hasteIcon);
  //     this.isHaste = true;
  //   }
  // }

  /**
   *
   * @description
   * 현재 시전 상태에 따라 스킬 토글
   * @description
   * 캐릭터 바다 collide 제거
   *
   * @author bell
   */
  // skilllevitation(): void {
  //   const temp = this.scene.physics.world.colliders;

  //   if (this.isLevitation) {
  //     // 아이콘 삭제
  //     this.levitationIcon?.destroy();

  //     // skill off 효과음
  //     this.effectSound('skill_off', 800, 0.1);

  //     // 시전상태 : false
  //     this.isLevitation = false;

  //     // 만약 world 라는 이름이 collider가 존재하지 않는 경우에만
  //     // world collider 생성
  //     if (!temp.getActive().find(el => el.name == 'world'))
  //       this.createColliderForLayer();
  //   } else {
  //     // 레비테이션 아이콘 생성
  //     // 스프라이트로 생성하여 x,y 설정 가능하도록
  //     this.levitationIcon = new Phaser.GameObjects.Sprite(
  //       this.scene,
  //       this.me.x,
  //       this.me.y,
  //       'items',
  //       56,
  //     );
  //     // world collider 제거
  //     temp.remove(temp.getActive().filter(el => el.name == 'world')[0]);

  //     // skill on 효과음
  //     this.effectSound('skill_on', 800, 0.1);

  //     // 아이콘 y좌표 설정
  //     this.levitationIcon.y -= 45;
  //     // scene에 추가
  //     this.scene.add.existing(this.levitationIcon);
  //     // 시전상태 : true
  //     this.isLevitation = true;
  //   }
  // }

  /**
   * @description
   * 바다 전용 collider 설정을 만들어주는 함수
   *
   * @author bell
   */
  createColliderForLayer(): void {
    this.scene.physics.add.collider(this, this.layer).name = 'world';
  }

  // /**
  //  * @param skillId {string} - load 한 skill의 참조값
  //  * @param ms {number} - 삭제 시 setTimeout 값 조정
  //  * @param volume {number} - 오디오 볼륨 조정
  //  *
  //  * @author bell
  //  */
  // effectSound(
  //   skillId: string,
  //   ms?: number | 1000,
  //   volume?: number | 0.2,
  // ): void {
  //   if (this.scene.sound.getAll(skillId).length > 0) return;

  //   const sound = this.scene.sound.add(skillId, {
  //     volume,
  //   });
  //   sound.play();
  //   setTimeout(() => {
  //     this.scene.sound.remove(sound);
  //   }, ms);
  // }

  /**
   * @description
   * 일반 상태와, 헤이스트 상태에 따라 사운드를 바꾸는 함수
   *
   * @author bell
   */
  isHasteSound() {
    !this.skill.isHaste
      ? Effect.effectSound(this.scene, 'walk', 200, 0.03)
      : Effect.effectSound(this.scene, 'haste', 1000);
  }
}

export default Player;
