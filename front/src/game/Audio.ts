class Audio {
  static preload(scene: Phaser.Scene, id: string, src: string[]) {
    scene.load.audio(id, src);
  }
}

export default Audio;
