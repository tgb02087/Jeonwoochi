import { Input, Scene } from 'phaser';
import map from './country-map2.json';
import Player from './Player';
import Resource from './Resources';
import eventEmitter from '../utils/eventEmitter';
import { MapData } from './../mocks/handlers/festival_list';
import Bgm from './Bgm';
import Effect from './Effect';

const SPAWN_POINT_X = 10386;
const SPAWN_POINT_Y = 9669;

interface FestivalObject {
  festival: MapData; // 타일맵 상의 축제 오브젝트
  x: number; // 축제 오브젝트의 타일맵 x 좌표
  y: number; // 축제 오브젝트의 타일맵 y 좌표
  height: number; // 축제 오브젝트 스프라이트의 높이
  msg: string; // 축제 오브젝트 이름 아래에 띄울 메시지
}

interface MsgEvent {
  tileX: number; // 메시지 이벤트가 발생할 타일맵상의 열 번호
  tileY: number; // 메시지 이벤트가 발생할 타일맵상의 행 번호
  msg: string; // 메시지 이벤트 발생 시 띄울 메시지
}

// 메시지 이벤트 객체 리스트
const msgEventObjects: MsgEvent[] = [
  { tileX: 300, tileY: 176, msg: '여기는 SSAFY 서울 캠퍼스!' },
  { tileX: 322, tileY: 302, msg: '여기는 SSAFY 대전 캠퍼스!' },
  { tileX: 414, tileY: 329, msg: '여기는 SSAFY 구미 캠퍼스!' },
  { tileX: 281, tileY: 429, msg: '여기는 SSAFY 광주 캠퍼스!' },
  { tileX: 450, tileY: 441, msg: '여기는 SSAFY 부울경 캠퍼스!' },
];

/**
 * 게임 씬(Scene) 관리 클래스
 *
 * @author Sckroll
 */
class BootScene extends Scene {
  private player!: Player;
  private minimap!: Phaser.Cameras.Scene2D.Camera;
  private festivalList!: Array<MapData[]> | undefined;
  // private festivalListFetched = false;
  private collidedFestivalObject!: FestivalObject | undefined;
  private collidedFestivalsIdx!: number | undefined;
  private popupText!: Phaser.GameObjects.Group | undefined;
  private popupOpened = false;
  private popupEnabledTime = 0;
  private enterKey!: Input.Keyboard.Key;
  private bgm!: any;
  private msgEventObj!: MsgEvent | undefined;

  preload() {
    // 타일맵 불러오기
    this.load.image('sea', '/images/map/Animated water tiles (full tile).png');
    this.load.image(
      'world',
      '/images/map/Animated water tiles(edges) - flat style.png',
    );
    this.load.image('etc', '/images/map/Tileset-Props.png');

    this.load.tilemapTiledJSON('map', map);

    // 오디오 데이터 불러오기
    Bgm.preload(this, 'bgm', ['/audios/bgm/Coffee Break.mp3']);
    Effect.preload(this, 'skill_on', ['/audios/effects/skill on.wav']);
    Effect.preload(this, 'skill_off', ['/audios/effects/skill off.wav']);
    Effect.preload(this, 'walk', ['/audios/effects/walk.wav']);
    Effect.preload(this, 'haste', ['/audios/effects/haste.wav']);
    Effect.preload(this, 'event', ['/audios/effects/event.wav']);

    // 플레이어 클래스 불러오기
    Player.preload(this);

    // 더미 festival atlas
    Resource.preload(this);

    // 축제 오브젝트 이름표 배경 불러오기
    this.load.image('nameTag', '/images/map/name-tag.png');

    // 파티클 이미지 불러오기
    this.load.image(
      'particle-msg',
      'https://labs.phaser.io/assets/particles/blue.png',
    );

    // 리액트 컴포넌트로부터 축제 리스트를 받고 저장
    eventEmitter.on('festivals', (festivalList?: Array<MapData[]>) => {
      this.festivalList = festivalList;
      // this.festivalListFetched = true;
    });
  }

  create() {
    // const festival = map
    // 타일맵 레이어를 추가할 수도 있기 때문에 tiles -> tiles1로 이름 변경

    // 앱, 타일, 레이어 설정
    const map = this.make.tilemap({ key: 'map' });
    // const tileset = map.addTilesetImage('jeonwoochi-tileset', 'tiles');
    // const sea = map.addTilesetImage('Animated water tiles (full tile)', 'sea');
    const world = map.addTilesetImage(
      'Animated water tiles(edges) - flat style',
      'world',
    );
    const sea = map.addTilesetImage('Animated water tiles (full tile)', 'sea');
    const etc = map.addTilesetImage('Tileset-Props', 'etc');

    // const worldLayer = map.createLayer('tiles1', tileset, 0, 0);
    // const seaLayer = map.createLayer('sea', sea, 0, 0);
    const worldLayer = map.createLayer('world', [world, sea], 0, 0);
    // const seaLayer = map.createLayer('world', sea, 0, 0);
    const etcLayer = map.createLayer('etc', etc, 0, 0);

    // bgm 설정 초기화
    this.bgm = this.sound.add('bgm', {
      mute: false,
      volume: 0.09,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 1,
    });
    this.bgm.play();

    // 타일에 충돌(Collision) 적용
    // world2Layer.setCollisionByProperty({ collides: true });
    worldLayer.setCollisionByProperty({ collides: true });
    etcLayer.setCollisionByProperty({ collides: true });

    // 스폰 지점 설정
    // 로컬 스토리지에 저장된 스폰 지점이 있다면 해당 지점에서 시작
    const prevSpawnPoint = localStorage.getItem('spawnLocation');
    let spawnX: number, spawnY: number;
    if (prevSpawnPoint) {
      const { x: prevX, y: prevY } = JSON.parse(prevSpawnPoint);
      spawnX = prevX || SPAWN_POINT_X;
      spawnY = prevY || SPAWN_POINT_Y;
    } else {
      const spawnPoint = map.findObject(
        'Objects',
        obj => obj.name === 'Spawn Point',
      );
      spawnX = spawnPoint.x || SPAWN_POINT_X;
      spawnY = spawnPoint.y || SPAWN_POINT_Y;
    }

    // 플레이어 인스턴스
    this.player = new Player(
      this,
      spawnX,
      spawnY,
      'atlas',
      'player-front',
      worldLayer,
    );

    this.physics.add.collider(this.player, etcLayer);

    // 카메라 설정
    const camera = this.cameras.main;

    camera.startFollow(this.player.me);

    // 경계 밖으로 카메라가 나가지 않도록 설정
    camera
      .setBounds(0, 0, map.widthInPixels, map.heightInPixels)
      .setZoom(1.0)
      .setName('main');

    // Enter 키 입력 초기화
    this.enterKey = this.input.keyboard.addKey('ENTER');

    // 이미 존재하는 게 있다면 삭제
    const intervalId: number = window.setInterval(
      () =>
        eventEmitter.emit('playerLocation', {
          x: this.player.body.x,
          y: this.player.body.y,
        }),
      1000,
    );

    // 메시지 이벤트 생성
    this.createEventObjects(msgEventObjects);

    eventEmitter.emit('intervalId', intervalId);
    this.createFestivalObjects();
    console.log('부름');
  }

  update(time: number) {
    this.player.update();

    // 사운드 상태 체크
    // console.log(eventEmitter.emit('soundCheck'));

    if (eventEmitter.emit('bgmOn')) {
      console.log('play');
      this.bgm.play();
    }
    if (eventEmitter.emit('bgmOff')) {
      console.log('stop');
      this.bgm.stop();
    }

    // festivalListFetched 상태로 축제 리스트 업데이트 여부 확인
    // console.log(this.festivalListFetched, this.festivalList?.length);

    // if (this.festivalListFetched) {
    //   this.festivalListFetched = false;
    // }

    // 축제 혹은 메시지 이벤트 오브젝트와 충돌했을 때 팝업 텍스트 띄우기
    if (this.popupOpened) {
      if (this.collidedFestivalObject) {
        this.showPopupMessage(this.collidedFestivalObject);
      } else if (this.msgEventObj) {
        this.showPopupMessage(this.msgEventObj);
      }
      this.popupEnabledTime = time;
      this.popupOpened = false;
    }

    // 팝업 텍스트가 떠있을 경우
    if (this.popupEnabledTime > 0) {
      if (this.collidedFestivalObject) {
        // Enter 키를 입력하면 축제 페이지로 이동하는 이벤트를 송신
        if (this.enterKey.isDown) {
          // event 사운드 추가
          Effect.effectSound(this, 'event', 300, 0.2);
          eventEmitter.emit('visit', this.collidedFestivalsIdx);

          // 동시에 현재 좌표를 로컬 스토리지에 저장
          const spawnLocation = { x: this.player.me.x, y: this.player.me.y };
          localStorage.setItem('spawnLocation', JSON.stringify(spawnLocation));
        }
      }

      // 3초가 지나면 팝업 텍스트 없애기
      if (time - this.popupEnabledTime >= 3000) {
        this.popupEnabledTime = 0;
        this.popupText?.destroy(true, true);
        this.popupText = undefined;
        this.collidedFestivalObject = undefined;
        this.msgEventObj = undefined;
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
    this.festivalList?.forEach((festivals: MapData[], idx: number) => {
      const { x, y } = BootScene.convertLatLngToXY(festivals[0]);
      // console.log(festival.festivalName, x, y);

      // 오브젝트 생성
      const { me } = new Resource(this, x, y, 'festival', 'festival3');
      const festivalObject = {
        festival: festivals[0],
        x,
        y,
        height: me.height,
        msg: 'Enter 키를 눌러서 축제 보기',
      };

      // 충돌 적용
      this.physics.add.collider(this.player, me, () => {
        this.collidedFestivalObject = festivalObject;
        this.collidedFestivalsIdx = idx;
        this.msgEventObj = undefined;
        this.popupOpened = true;
      });

      // 축제명 표시
      this.createFestivalNameTag(festivalObject, festivals.length - 1);
    });
  }

  /**
   * 지정된 메시지 이벤트를 초기화하는 메소드
   *
   * @param msgEvents 메시지 이벤트를 모아놓은 객체 리스트
   * @author Sckroll
   */
  createEventObjects(msgEvents: MsgEvent[]) {
    msgEvents.forEach(msgEventObj => {
      const x = msgEventObj.tileX * 32 + 16;
      const y = msgEventObj.tileY * 32 + 32;

      // 오브젝트 생성
      const { me } = new Resource(
        this,
        x,
        y,
        'msg-event-object',
        'msg-event-object',
      );

      // 충돌 적용
      this.physics.add.collider(this.player, me, () => {
        this.msgEventObj = msgEventObj;
        this.collidedFestivalObject = undefined;
        this.popupOpened = true;
      });

      // 메시지 이벤트를 강조하기 위해 파티클 이펙트 적용
      this.add.particles('particle-msg').createEmitter({
        x,
        y,
        speed: 200,
        blendMode: 'SCREEN',
        alpha: 0.4,
        scale: {
          min: 0.1,
          max: 0.9,
        },
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
  static convertLatLngToXY(festival: MapData) {
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
      east: 102,
      west: 138,
      north: 72,
      south: 40,
    };

    // 국토 타일맵 가로 & 세로 길이
    const latLength = 800 - padding.east - padding.west;
    const lngLength = 700 - padding.north - padding.south;
    // const latLength = 800;
    // const lngLength = 700;

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
  createFestivalNameTag(festivalObject: FestivalObject, len: number) {
    const { festival, x, y, height } = festivalObject;

    const nameTag = this.add.group();
    const background = this.add.sprite(0, 0, 'nameTag');
    const tmpFestivalName =
      festival.festivalName.length > 12
        ? festival.festivalName.slice(0, 12) + '...'
        : festival.festivalName;
    const festivalName =
      len > 0 ? tmpFestivalName + ' 외 ' + len + '개' : tmpFestivalName;
    const text = this.add.text(0, 0, festivalName, {
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
   * 팝업 메시지를 띄우는 메소드
   *
   * @param msgObj 메시지 관련 객체 (축제 오브젝트에 대한 정보가 담긴 객체 혹은 메시지 이벤트 객체만 가능)
   * @author Sckroll
   */
  showPopupMessage(msgObj: FestivalObject | MsgEvent) {
    this.popupText?.destroy(true, true);

    let x, y, height;

    if ('festival' in msgObj) {
      x = msgObj.x;
      y = msgObj.y;
      height = msgObj.height;
    } else {
      x = msgObj.tileX * 32 + 16;
      y = msgObj.tileY * 32 + 16;
      height = 64;
    }

    this.popupText = this.add.group();
    const text = this.add.text(0, 0, msgObj.msg, {
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
