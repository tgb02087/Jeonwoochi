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

  /** @description 주요 객체 값 저장, constructor에서 생성된 후, update에서도 사용되기 때문 */
  public me: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  /** @description 커서 이벤트 설정 - 캐릭터 이동 */
  // private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private inputKeys: any;
  private isRiding: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string,
  ) {
    super(scene, x, y, texture, frame);

    // sprite 생성 및 설정
    this.me = scene.physics.add
      .sprite(x, y, texture, frame)
      .setSize(30, 40)
      .setOffset(0, 24);

    this.body = this.me.body;
    this.isRiding = false;

    // 애니메이션 설정
    const anims = this.me.anims;
    anims.create({
      key: 'misa-left-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-left-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'misa-right-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-right-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'misa-front-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-front-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'misa-back-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-back-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // 방향기 설정
    this.inputKeys = scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      // riding: Phaser.Input.Keyboard.KeyCodes.C,
    });

    scene.input.keyboard.on('keydown-' + 'C', this.skillRiding);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas(
      'atlas',
      'https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png',
      'https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json',
    );
  }

  update() {
    let speed: number;
    // Shift 키를 누르면서 이동하면 빠르게 이동
    if (this.inputKeys.shift.isDown) speed = 350;
    else speed = 175;

    // if (this.inputKeys.riding.isDown) {
    //   this.skillRiding();
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
    // 대각선으로 이동 시 속도 조절을 위해 속도 정규화(normalize) & 크기 조정(scale)
    this.body.velocity.normalize().scale(speed);
    // 애니메이션 업데이트 (상하 이동보다 좌우 이동을 우선시)
    if (this.inputKeys.left.isDown) {
      this.me.anims.play('misa-left-walk', true);
    } else if (this.inputKeys.right.isDown) {
      this.me.anims.play('misa-right-walk', true);
    } else if (this.inputKeys.up.isDown) {
      this.me.anims.play('misa-back-walk', true);
    } else if (this.inputKeys.down.isDown) {
      this.me.anims.play('misa-front-walk', true);
    } else {
      this.me.anims.stop();

      // 이동 중이라면, 사용할 프레임 선택 & 유휴(idle) 상태로 전환\
      if (prevVelocity.x < 0) this.me.setTexture('atlas', 'misa-left');
      else if (prevVelocity.x > 0) this.me.setTexture('atlas', 'misa-right');
      else if (prevVelocity.y < 0) this.me.setTexture('atlas', 'misa-back');
      else if (prevVelocity.y > 0) this.me.setTexture('atlas', 'misa-front');
    }
  }

  skillRiding() {
    if (this.isRiding) {
      console.log('스킬 끄기');
      this.isRiding = false;
    } else {
      console.log('스킬 시전');
      this.isRiding = true;
    }
  }
}

export default Player;
