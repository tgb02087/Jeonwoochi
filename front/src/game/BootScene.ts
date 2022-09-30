import { Input, Scene } from 'phaser';
import map from './country-map.json';
import Player from './Player';
import Resource from './Resources';
import eventEmitter from '../utils/eventEmitter';
import { MapData } from './../mocks/handlers/festival_list';

interface FestivalObject {
  festival: MapData; // 타일맵 상의 축제 오브젝트
  x: number; // 축제 오브젝트의 타일맵 x 좌표
  y: number; // 축제 오브젝트의 타일맵 y 좌표
  height: number; // 축제 오브젝트 스프라이트의 높이
}

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
  private collidedFestivalObject!: FestivalObject | undefined;
  private popupText!: Phaser.GameObjects.Group | undefined;
  private popupOpened = false;
  private popupEnabledTime = 0;
  private enterKey!: Input.Keyboard.Key;

  preload() {
    // 타일맵 불러오기
    this.load.image('tiles', '/images/map/jeonwoochi-tileset.png');
    this.load.tilemapTiledJSON('map', map);
    this.load.audio('bgm', ['/audios/bgm/2 - Big Giant Trees - Gotanda.mp3']);

    // 플레이어 클래스 불러오기
    Player.preload(this);

    // 더미 festival atlas
    Resource.preload(this);

    // 축제 오브젝트 이름표 배경 불러오기
    this.load.image('nameTag', '/images/map/name-tag.png');

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

    // 플레이어 인스턴스
    this.player = new Player(
      this,
      spawnPoint.x || 0,
      spawnPoint.y || 0,
      'atlas',
      'misa-front',
      worldLayer,
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

    // Enter 키 입력 초기화
    this.enterKey = this.input.keyboard.addKey('ENTER');
  }

  update(time: number) {
    this.player.update();

    // festivalListFetched 상태로 축제 리스트 업데이트 여부 확인
    if (this.festivalListFetched) {
      this.createFestivalObjects();
      this.festivalListFetched = false;
    }

    // 축제 오브젝트와 충돌했을 때 축제 이름 아래에 텍스트 띄우기
    if (this.collidedFestivalObject && this.popupOpened) {
      this.showPopupMessage(
        this.collidedFestivalObject,
        'Enter 키를 눌러서 축제 보기',
      );
      this.popupEnabledTime = time;
      this.popupOpened = false;
    }

    // 축제 이름 아래에 텍스트가 떠있을 경우
    if (this.popupEnabledTime > 0) {
      // Enter 키를 입력하면 축제 페이지로 이동하는 이벤트를 송신
      if (this.enterKey.isDown)
        eventEmitter.emit('visit', this.collidedFestivalObject);

      // 3초가 지나면 축제 이름 아래의 텍스트 없애기
      if (time - this.popupEnabledTime >= 3000) {
        this.popupEnabledTime = 0;
        this.popupText?.destroy(true, true);
        this.popupText = undefined;
        this.collidedFestivalObject = undefined;
      }
    }

    // 디버그용 (1초 간격으로 플레이어 좌표를 콘솔에 출력)
    // if (time % 1000 > 40 && time % 1000 < 60) {
    //   console.log(
    //     `현재 좌표: ${Math.floor(this.player.body.x)}, ${Math.floor(
    //       this.player.body.y,
    //     )}`,
    //   );
    // }
  }

  /**
   * 위도와 경도에 따라 축제 오브젝트를 생성하는 메소드
   *
   * @author Sckroll
   */
  createFestivalObjects() {
    this.festivalList?.forEach(festival => {
      const { x, y } = this.convertLatLngToXY(festival);
      console.log(festival.name, x, y);

      // 오브젝트 생성
      const { me } = new Resource(this, x, y, 'festival', 'festival2');
      const festivalObject = { festival, x, y, height: me.height };

      // 충돌 적용
      this.physics.add.collider(this.player, me, () => {
        console.log('축제 오브젝트와 접촉했다');
        this.collidedFestivalObject = festivalObject;
        this.popupOpened = true;
      });

      // 축제명 표시
      this.createFestivalNameTag(festivalObject);
    });
  }

  /**
   * 축제가 열리는 장소의 실제 경도와 위도를 게임 상의 `x`, `y` 좌표로 변환하는 메소드
   *
   * @param festival 축제 정보가 들어있는 객체
   * @returns 게임 상의 `x`, `y` 좌표가 들어있는 객체
   * @author Sckroll
   */
  convertLatLngToXY(festival: MapData) {
    const { lat, lng } = festival;

    // 남한 국토 극동, 극서의 경도와 극북, 극남의 위도
    // 출처: http://aispiration.com/spatial/geo-info.html
    const extremePoints = {
      east: 131.87222222,
      west: 125.06666667,
      north: 38.45,
      south: 33.1,
    };

    // 국토 타일맵과 전체 타일맵 간 동서남북 여백
    const padding = {
      east: 72,
      west: 83,
      north: 52,
      south: 40,
    };

    // 국토 타일맵 가로 & 세로 길이
    // const latLength = 800 - padding.east - padding.west;
    // const lngLength = 700 - padding.north - padding.south;
    const latLength = 800;
    const lngLength = 700;

    // 1칸 당 좌우 거리 = (극동 - 극서) / 국토 타일맵 가로 길이
    // 1칸 당 상하 거리 = (극북 - 극남) / 국토 타일맵 세로 길이
    const tilePerLat = (extremePoints.east - extremePoints.west) / latLength;
    const tilePerLng = (extremePoints.north - extremePoints.south) / lngLength;

    /**
     * 동서남북 여분의 간격을 감안하면
     * 맵 전체 중 가장 왼쪽의 경도 = 극서 - (1칸 당 좌우 거리 * 서쪽 여백)
     * 맵 전체 중 가장 오른쪽의 경도 = 극동 + (1칸 당 좌우 거리 * 동쪽 여백)
     * 맵 전체 중 가장 위쪽의 위도 = 극북 + (1칸 당 상하 거리 * 북쪽 여백)
     * 맵 전체 중 가장 아래쪽의 위도 = 극남 - (1칸 당 상하 거리 * 남쪽 여백)
     */
    const latStartPoint = extremePoints.west - tilePerLat * padding.west;
    const lngStartPoint = extremePoints.north + tilePerLng * padding.north;

    // console.log(tilePerLat, tilePerLng, latStartPoint, lngStartPoint);

    // 타일맵의 가장 왼쪽의 경도와 가장 위쪽의 위도를 기준으로
    // 파라미터로 받은 축제의 경도 & 위도를 타일맵 x & y 좌표로 변환
    // 주의: x와 y는 칸의 개수가 아님!
    const x = ((lat - latStartPoint) / tilePerLat) * 32 + 16;
    const y = ((lngStartPoint - lng) / tilePerLng) * 32 + 16;

    return { x, y };
  }

  /**
   * 축제 이름을 오브젝트 상단에 띄우는 메소드
   *
   * @param festivalObject 타일맵 상의 축제 오브젝트에 대한 정보가 담긴 객체
   * @author Sckroll
   */
  createFestivalNameTag(festivalObject: FestivalObject) {
    const { festival, x, y, height } = festivalObject;

    const nameTag = this.add.group();
    const background = this.add.sprite(0, 0, 'nameTag');
    const text = this.add.text(0, 0, festival.name, {
      fontFamily: 'DungGeunMo',
      fixedWidth: background.width,
      align: 'center',
      wordWrap: { useAdvancedWrap: true },
    });

    // 이름표에 배경 및 텍스트 추가
    nameTag.add(background);
    nameTag.add(text);

    // 이름표 좌표 설정
    nameTag.setX(x);
    nameTag.setY(y - height * (3 / 2));

    // 텍스트 좌표 설정 (8은 텍스트 위치 보정값)
    text.setX(x - background.width / 2);
    text.setY(y - height * (3 / 2) - 8);
  }

  /**
   * 축제 이름 아래에 메시지를 띄우는 메소드
   *
   * @param festivalObject 타일맵 상의 축제 오브젝트에 대한 정보가 담긴 객체
   * @param msg 표시할 메시지
   * @author Sckroll
   */
  showPopupMessage(festivalObject: FestivalObject, msg: string) {
    this.popupText?.destroy(true, true);

    const { x, y, height } = festivalObject;

    this.popupText = this.add.group();
    const text = this.add.text(0, 0, msg, {
      fontFamily: 'DungGeunMo',
      backgroundColor: '#00000066',
      padding: { x: 4, y: 4 },
      wordWrap: { useAdvancedWrap: true },
    });

    this.popupText.add(text);

    // 좌표 설정
    this.popupText.setX(x - text.width / 2);
    this.popupText.setY(y - height + text.height / 2);
  }
}

export default BootScene;