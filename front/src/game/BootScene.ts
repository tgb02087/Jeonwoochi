import { Scene } from 'phaser';
import map from './country-map.json';

/**
 * 게임 씬(Scene) 관리 클래스
 *
 * @author Sckroll
 */
class BootScene extends Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  preload() {
    // 타일맵 불러오기
    this.load.image('tiles', '/images/map/jeonwoochi-tileset.png');
    this.load.tilemapTiledJSON('map', map);

    // (임시) 캐릭터 불러오기
    this.load.atlas(
      'atlas',
      'https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png',
      'https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json',
    );
  }

  create() {
    // 앱, 타일, 레이어 설정
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('jeonwoochi-tileset', 'tiles');
    // 타일맵 레이어를 추가할 수도 있기 때문에 tiles -> tiles1로 이름 변경
    const worldLayer = map.createLayer('tiles1', tileset, 0, 0);

    // 타일에 충돌(Collision) 적용
    worldLayer.setCollisionByProperty({ collides: true });

    // 스폰 지점 설정
    const spawnPoint = map.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point',
    );

    // 플레이어 설정
    this.player = this.physics.add
      .sprite(spawnPoint.x || 0, spawnPoint.y || 0, 'atlas', 'misa-front')
      .setSize(30, 40)
      .setOffset(0, 24);

    // 플레이어 충돌 설정
    this.physics.add.collider(this.player, worldLayer);

    // 플레이어가 이동할 때 애니메이션 적용
    const anims = this.anims;
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

    // 카메라 설정
    const camera = this.cameras.main;
    camera.startFollow(this.player);

    // 경계 밖으로 카메라가 나가지 않도록 설정
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // 방향키 변수
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    let speed: number;

    // Shift 키를 누르면서 이동하면 빠르게 이동
    if (this.cursors.shift.isDown) speed = 350;
    else speed = 175;

    const prevVelocity = this.player.body.velocity.clone();

    // 이전 프레임의 속도를 0으로 설정
    this.player.body.setVelocity(0);

    // 좌우 이동
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
    }

    // 상하 이동
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
    }

    // 대각선으로 이동 시 속도 조절을 위해 속도 정규화(normalize) & 크기 조정(scale)
    this.player.body.velocity.normalize().scale(speed);

    // 애니메이션 업데이트 (상하 이동보다 좌우 이동을 우선시)
    if (this.cursors.left.isDown) {
      this.player.anims.play('misa-left-walk', true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('misa-right-walk', true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('misa-back-walk', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('misa-front-walk', true);
    } else {
      this.player.anims.stop();

      // 이동 중이라면, 사용할 프레임 선택 & 유휴(idle) 상태로 전환
      if (prevVelocity.x < 0) this.player.setTexture('atlas', 'misa-left');
      else if (prevVelocity.x > 0)
        this.player.setTexture('atlas', 'misa-right');
      else if (prevVelocity.y < 0) this.player.setTexture('atlas', 'misa-back');
      else if (prevVelocity.y > 0)
        this.player.setTexture('atlas', 'misa-front');
    }
  }
}

export default BootScene;
