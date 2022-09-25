import { MapData } from './../mocks/handlers/festival_list';
import { Scene } from 'phaser';
import map from './country-map.json';
import Player from './Player';
import Resource from './Resources';
import eventEmitter from '../utils/eventEmitter';


/**
 * 게임 씬(Scene) 관리 클래스
 *
 * @author Sckroll
 */
class BootScene extends Scene {
  private player!: Player;
  private festivalObject!: Resource;
  private checkCollide = false;
  private minimap!: Phaser.Cameras.Scene2D.Camera;
  private spawns!: Phaser.Physics.Arcade.Group; // 스폰되는 축제 오브젝트들을 관리하는 멤버

  preload() {
    // 타일맵 불러오기
    this.load.image('tiles', '/images/map/jeonwoochi-tileset.png');
    this.load.tilemapTiledJSON('map', map);
    this.load.audio('bgm', ['/audios/bgm/2 - Big Giant Trees - Gotanda.mp3']);

    // 축제 오브젝트 이미지 파일 불러오기
    this.load.image('sample-object', '/images/festival/sample-object.png');

    // 플레이어 클래스 불러오기
    Player.preload(this);

    // 더미 festival atlas
    Resource.preload(this);
  }

  create() {
    // 앱, 타일, 레이어 설정
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('jeonwoochi-tileset', 'tiles');
    // const festival = map
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

    // 더미 festival 정보 생성
    const festivalInfo = map.findObject(
      'Objects',
      obj => obj.name === 'festival',
    );

    // 플레이어 인스턴스
    this.player = new Player(
      this,
      spawnPoint.x || 0,
      spawnPoint.y || 0,
      'atlas',
      'misa-front',
    );

    // 페스티벌 오브젝트 인스턴스
    this.festivalObject = new Resource(
      this,
      festivalInfo.x || 0,
      festivalInfo.y || 0,
      'festival',
      'festival2',
    );

    // this.minimap.setBackgroundColor(0x002244);

    // 맵 collider 설정 세팅
    this.physics.add.collider(this.player, worldLayer, (player, _) => {
      if (!player.body.checkCollision.none) {
        console.log('바다와 접촉했다');
      }
    });

    this.physics.add.collider(
      this.player,
      this.festivalObject.me,
      (player, _) => {
        // 이곳이 바로 축제별 페이지를 부르는 함수를 호출하면 된다잉
        // 근데 어떻게 호출하지...
        if (!player.body.checkCollision.none) {
          console.log('축제 오브젝트와 접촉했다');
          // console.log('축제 오브젝트와 접촉했다');
          // setTimeout(() => {
          //   this.checkCollide = false;
          //   console.log('다시 false로 바귐');
          // }, 3000);
        }
      },
    );

    // 카메라 설정
    const camera = this.cameras.main;

    camera.startFollow(this.player.me);

    // 경계 밖으로 카메라가 나가지 않도록 설정
    camera
      .setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      .setZoom(1.8)
      .setName('main');

    // 미니맵 생성
    // 위치 선정
    // 줌 크기
    this.minimap = this.cameras
      .add(30, window.innerHeight - 430, 400, 400)
      .setZoom(0.2)
      .setName('mini');

    // 미니맵 스크롤 설정
    this.minimap.scrollX = this.player.x;
    this.minimap.scrollY = this.player.y;

    // 미니맵도 캐릭터에 포커싱 되도록
    const minimapCamera = this.cameras.cameras.find(el => el.name === 'mini');
    minimapCamera?.startFollow(this.player.me);

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
