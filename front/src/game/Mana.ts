class Mana extends Phaser.GameObjects.Graphics {
  public bar: Phaser.GameObjects.Graphics;
  // public x: number;
  // public y: number;
  public value: number;
  private p: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, undefined);
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.bar.x = x;
    this.bar.y = y;
    this.value = 100;
    this.p = 76 / 100;

    this.draw();
    scene.add.existing(this.bar);
  }

  draw() {
    this.bar.clear();

    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, 80, 16);

    //  Health
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

  decrease() {
    this.value -= 0.05;
    if (this.value < 0) {
      this.value = 0;
    }
    this.draw();
    // return this.value === 0;
  }

  increase() {
    this.value += 0.1;
    if (this.value >= 100) {
      this.value = 100;
    }
    this.draw();
    // return this.value === 0;
  }
}

export default Mana;
