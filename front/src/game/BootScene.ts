import { MapData } from './../mocks/handlers/festival_list';
import { Scene } from 'phaser';
import map from './country-map.json';
import Player from './Player';
import eventEmitter from '../utils/eventEmitter';

/**
 * 게임 씬(Scene) 관리 클래스
 *
 * @author Sckroll
 */
class BootScene extends Scene {
  private player!: Player;
  private spawns!: Phaser.Physics.Arcade.Group; // 스폰되는 축제 오브젝트들을 관리하는 멤버

  preload() {
    // 타일맵 불러오기
    this.load.image('tiles', '/images/map/jeonwoochi-tileset.png');
    this.load.tilemapTiledJSON('map', map);

    // 축제 오브젝트 이미지 파일 불러오기
    this.load.image('sample-object', '/images/festival/sample-object.png');

    // 플레이어 클래스 불러오기
    Player.preload(this);
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

    // 리액트 컴포넌트로부터 축제 리스트 받기
    eventEmitter.on('festivals', (festivalList?: MapData[]) => {
      // 축제 오브젝트 생성
      this.createFestivalObjects(festivalList);
    });
  }

  /**
   * 축제 오브젝트를 생성하는 메소드
   */
  createFestivalObjects(festivalList?: MapData[]) {
    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Sprite,
    });

    // 우선 테스트를 위해 콘솔에 출력만 수행
    console.log(festivalList);

    // 오브젝트 생성 테스트
    const festival = this.spawns.create(
      32 * 295 + 16,
      32 * 178 + 16,
      'sample-object',
    );
    festival.body.setImmovable();
  }

  update() {
    this.player.update();
  }
}

export default BootScene;
