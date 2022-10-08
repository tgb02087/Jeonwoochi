class Resource extends Phaser.Physics.Arcade.Sprite {
  public me: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string,
  ) {
    super(scene, x, y, texture, frame);
    this.me = scene.physics.add.staticSprite(x, y, texture, frame);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas(
      'festival',
      '/images/map/festivals.png',
      '/images/map/festivals_atlas.json',
    );
  }
}

export default Resource;
