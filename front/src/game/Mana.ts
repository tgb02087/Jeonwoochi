/**
 * @description
 * 마나게이지 인스턴스를 생성하는 클래스
 * @constructor
 * @param {Phaser.scene} scene - 띄울 맵,
 * @param {number} x - 캐릭터의 x좌표,
 * @param {number} y - 캐릭터의 y좌표,
 * @author bell
 */

class Mana extends Phaser.GameObjects.Graphics {
  // 마나 바 게임오브젝트
  public bar: Phaser.GameObjects.Graphics;
  // 마나 게이지의 총 크기
  public value: number;
  private p: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, undefined);
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.x = x;
    this.bar.y = y;
    this.value = 100;
    this.p = 76 / 100;

    this.bar.setDepth(1);
    this.draw();
    scene.add.existing(this.bar);
  }

  /**
   * @description
   * 현재 value 상태를 체크하고
   * 새롭게 마나 게이지를 업데이트 하는 함수
   *
   * @author bell
   */
  draw(): void {
    this.bar.clear();

    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, 80, 16);

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 1, this.y + 1, 78, 14);

    if (this.value < 30) {
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x02498f);
    }

    const d = Math.floor(this.p * this.value);

    this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
  }

  /**
   * @description
   * 마나 value를 감소시키는 함수
   *
   * @author bell
   */
  decrease(): void {
    this.value -= 0.05;
    if (this.value < 0) {
      this.value = 0;
    }
    this.draw();
  }

  /**
   * @description
   * 마나 value를 증가시키는 함수
   *
   * @author bell
   */
  increase(): void {
    this.value += 0.1;
    if (this.value >= 100) {
      this.value = 100;
    }
    this.draw();
  }
}

export default Mana;
