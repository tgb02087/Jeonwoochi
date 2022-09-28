import { Scene } from 'phaser';
import map from './country-map.json';
import Player from './Player';
import Resource from './Resources';
import eventEmitter from '../utils/eventEmitter';
import { MapData } from './../mocks/handlers/festival_list';

/**
 * 게임 씬(Scene) 관리 클래스
 *
 * @author Sckroll
 */
class BootScene extends Scene {
  private player!: Player;
  private minimap!: Phaser.Cameras.Scene2D.Camera;
  private festivalList!: MapData[] | undefined;
  private festivalListFetched = false;

  preload() {
    // 타일맵 불러오기
    this.load.image('tiles', '/images/map/jeonwoochi-tileset.png');
    this.load.tilemapTiledJSON('map', map);
    this.load.audio('bgm', ['/audios/bgm/2 - Big Giant Trees - Gotanda.mp3']);

    // 플레이어 클래스 불러오기
    Player.preload(this);

    // 더미 festival atlas
    Resource.preload(this);

    // 리액트 컴포넌트로부터 축제 리스트를 받고 저장
    eventEmitter.on('festivals', (festivalList?: MapData[]) => {
      this.festivalList = festivalList;
      this.festivalListFetched = true;
    });
  }

  create() {
    // const festival = map
    // 타일맵 레이어를 추가할 수도 있기 때문에 tiles -> tiles1로 이름 변경

    // 앱, 타일, 레이어 설정
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('jeonwoochi-tileset', 'tiles');
    const worldLayer = map.createLayer('tiles1', tileset, 0, 0);

    // bgm 설정
    // 시끄러워서 주석처리합니다
    // const music = this.sound.add('bgm', {
    //   mute: false,
    //   volume: 0.05,
    //   rate: 1,
    //   detune: 0,
    //   seek: 0,
    //   loop: true,
    //   delay: 1,
    // });
    // music.play();

    // 타일에 충돌(Collision) 적용
    worldLayer.setCollisionByProperty({ collides: true });

    // 스폰 지점 설정
    const spawnPoint = map.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point',
    );

    // 더미 festival 정보 생성
    // const festivalInfo = map.findObject(
    //   'Objects',
    //   obj => obj.name === 'festival',
    // );

    // 플레이어 인스턴스
    this.player = new Player(
      this,
      spawnPoint.x || 0,
      spawnPoint.y || 0,
      'atlas',
      'misa-front',
      worldLayer,
    );

    // this.minimap.setBackgroundColor(0x002244);

    // 맵 collider 설정 세팅
    this.physics.add.collider(this.player, worldLayer, (player, _) => {
      if (!player.body.checkCollision.none) {
        console.log('바다와 접촉했다');
      }
    }).name = 'object';

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
  }

  update() {
    this.player.update();

    // festivalListFetched 상태로 업데이트 여부 확인
    if (this.festivalListFetched) {
      this.createFestivalObjects();
      this.festivalListFetched = false;
    }
  }

  /**
   * 위도와 경도에 따라 축제 오브젝트를 생성하는 메소드
   *
   * @author Sckroll
   */
  createFestivalObjects() {
    this.festivalList?.forEach(festival => {
      const { x, y } = this.convertLatLonToXY(festival);
      console.log(festival.name, x, y);

      const { me } = new Resource(
        this,
        16 + 32 * x,
        16 + 32 * y,
        'festival',
        'festival2',
      );
      // const { me } = new Resource(this, 9664.5, 5727, 'festival', 'festival2');

      this.physics.add.collider(this.player, me, player => {
        if (!player.body.checkCollision.none) {
          console.log('축제 오브젝트와 접촉했다');
        }
      });
    });
  }

  /**
   * 축제가 열리는 장소의 실제 경도와 위도를 게임 상의 `x`, `y` 좌표로 변환하는 메소드
   *
   * @param festival 축제 정보가 들어있는 객체
   * @returns 게임 상의 `x`, `y` 좌표가 들어있는 객체
   * @author Sckroll
   */
  convertLatLonToXY(festival: MapData) {
    const { lat, lng } = festival;

    // 남한 국토 극동, 극서의 경도와 극북, 극남의 위도
    // 출처: http://aispiration.com/spatial/geo-info.html
    const extremePoints = {
      east: 131.87222222,
      west: 125.06666667,
      north: 38.45,
      south: 33.1,
    };

    // 국토 타일맵의 상하좌우 간격
    const padding = {
      east: 72,
      west: 83,
      north: 52,
      south: 40,
    };

    // 타일맵 가로 & 세로 길이
    const latLength = 800;
    const lngLength = 700;

    // 1칸당 좌우 거리 = (극동 - 극서) / 800 = 0.0105512489147287º
    // 1칸당 상하 거리 = (극북 - 극남) / 700 = 0.0087993421052632º
    const tilePerLat = (extremePoints.east - extremePoints.west) / latLength;
    const tilePerLng = (extremePoints.north - extremePoints.south) / lngLength;

    /**
     * 상하좌우 여분의 간격을 감안하면
     * 맵 전체 중 가장 왼쪽의 경도 = 극서 - (0.0105512489147287º * 83칸) = 124.1909130100775º
     * 맵 전체 중 가장 오른쪽의 경도 = 극동 + (0.0105512489147287º * 72칸) = 132.6319121418605º
     * 맵 전체 중 가장 위쪽의 위도 = 극북 + (0.0087993421052632º * 52칸) = 38.90756578947369º
     * 맵 전체 중 가장 아래쪽의 위도 = 극남 - (0.0087993421052632º * 40칸) = 32.74802631578947º
     */
    const latStartPoint = extremePoints.west - tilePerLat * padding.west;
    const lngStartPoint = extremePoints.south - tilePerLng * padding.south;

    // console.log(lat, lng);
    // console.log(latStartPoint, lngStartPoint);

    // 타일맵의 가장 왼쪽의 경도와 가장 아래쪽의 위도를 기준으로
    // 파라미터로 받은 축제의 경도 & 위도를 타일맵 x & y 좌표로 변환
    const x = (lat - latStartPoint) / tilePerLat;
    const y = (lng - lngStartPoint) / tilePerLng;

    return { x, y };
  }
}

export default BootScene;
