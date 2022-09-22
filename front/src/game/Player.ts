class Player extends Phaser.Physics.Arcade.Sprite {
  static preload(scene: Phaser.Scene) {
    scene.load.atlas(
      'atlas',
      'https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png',
      'https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json',
    );
  }
}

export default Player;
