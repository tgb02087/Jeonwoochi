import { Scene } from 'phaser';
import map from './country-map.json';
import Player from './Player';

/**
 * 게임 씬(Scene) 관리 클래스
 *
 * @author Sckroll
 */
class BootScene extends Scene {
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  preload() {
    // 타일맵 불러오기
    this.load.image('tiles', '/images/map/jeonwoochi-tileset.png');
    this.load.tilemapTiledJSON('map', map);
    this.load.audio('bgm', [
      '/audios/bgm/07-The Sixth Floor Party.mp3',
      '/audios/bgm/02-The Purple Bonbon.mp3',
      '/audios/bgm/04-The Slug Monarch.mp3',
    ]);
    //
    Player.preload(this);
  }

  create() {
    // 앱, 타일, 레이어 설정
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('jeonwoochi-tileset', 'tiles');
    // 타일맵 레이어를 추가할 수도 있기 때문에 tiles -> tiles1로 이름 변경
    const worldLayer = map.createLayer('tiles1', tileset, 0, 0);

    // bgm 설정
    const music = this.sound.add('bgm', {
      mute: false,
      volume: 0.05,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 1,
    });
    music.play();

    // 타일에 충돌(Collision) 적용
    worldLayer.setCollisionByProperty({ collides: true });

    // 스폰 지점 설정
    const spawnPoint = map.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point',
    );

    // 플레이어 인스턴스
    this.player = new Player(
      this,
      spawnPoint.x || 0,
      spawnPoint.y || 0,
      'atlas',
      'misa-front',
    );

    // 맵 collider 설정 세팅
    this.physics.add.collider(this.player, worldLayer);

    // 카메라 설정
    const camera = this.cameras.main;

    camera.startFollow(this.player.me);

    // 경계 밖으로 카메라가 나가지 않도록 설정
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    this.player.update();
  }
}

export default BootScene;
