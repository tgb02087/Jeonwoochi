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
  private collidedFestivalObject = false;
  private popup!: Phaser.GameObjects.Text | undefined;
  // private popup!: Phaser.Physics.Arcade.StaticGroup | undefined;

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
  }

  update(time: number) {
    this.player.update();

    // festivalListFetched 상태로 업데이트 여부 확인
    if (this.festivalListFetched) {
      this.createFestivalObjects();
      this.festivalListFetched = false;
    }

    // 축제 오브젝트와 충돌했을 때 플레이어 머리 위에 팝업 창 띄우기
    if (this.collidedFestivalObject && !this.popup) {
      this.showPopupMessage('Enter 키를 눌러서 축제 보기');
      this.collidedFestivalObject = false;
    }
    // 현재 여기서 에러 발생!!
    if (this.popup) this.physics.moveToObject(this.popup, this.player.me, 1000);

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

      // 충돌 적용
      this.physics.add.collider(this.player, me, player => {
        if (!player.body.checkCollision.none) {
          console.log('축제 오브젝트와 접촉했다');
          if (!this.popup) this.collidedFestivalObject = true;
        }
      });

      // 축제명 표시
      this.createFestivalNameTag(festival.name, x, y, me.height);
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
   * @param name 축제명
   * @param x 이름표를 띄울 축제 오브젝트의 x 좌표
   * @param y 이름표를 띄울 축제 오브젝트의 y 좌표
   * @param height 축제 오브젝트 스프라이트의 높이
   * @author Sckroll
   */
  createFestivalNameTag(name: string, x: number, y: number, height: number) {
    const nameTag = this.add.group();
    const background = this.add.sprite(0, 0, 'nameTag');
    const text = this.add.text(0, 0, name, {
      fontFamily: 'DungGeunMo',
      wordWrap: { useAdvancedWrap: true },
    });

    // 이름표에 배경 및 텍스트 추가
    nameTag.add(background);
    nameTag.add(text);

    // 이름표 좌표 설정
    nameTag.setX(x);
    nameTag.setY(y - height * (3 / 2));

    // 텍스트 좌표 설정 (8은 텍스트 위치 보정값)
    text.setX(x - height + 8);
    text.setY(y - height * (3 / 2) - 8);
  }

  /**
   * 플레이어 머리 위에 메시지 팝업 창을 띄우는 메소드
   *
   * @param msg 팝업 창에 표시할 메시지
   * @author Sckroll
   */
  showPopupMessage(msg: string) {
    this.popup = this.add.text(
      this.player.body.x,
      this.player.body.y - this.player.body.height * (3 / 2),
      msg,
      {
        fontFamily: 'DungGeunMo',
        wordWrap: { useAdvancedWrap: true },
      },
    );

    // this.popup = this.physics.add.staticGroup();
    // const background = this.add.sprite(0, 0, 'nameTag');
    // const text = this.add.text(0, 0, msg, {
    //   fontFamily: 'DungGeunMo',
    //   wordWrap: { useAdvancedWrap: true },
    // });

    // // 이름표에 배경 및 텍스트 추가
    // this.popup.add(background);
    // this.popup.add(text);

    // // 이름표 좌표 설정
    // this.popup.setX(this.player.body.x);
    // this.popup.setY(this.player.body.y - this.player.body.height * (3 / 2));

    // // 텍스트 좌표 설정 (8은 텍스트 위치 보정값)
    // text.setX(this.player.body.x - this.player.body.height + 8);
    // text.setY(this.player.body.y - this.player.body.height * (3 / 2) - 8);
  }
}

export default BootScene;
