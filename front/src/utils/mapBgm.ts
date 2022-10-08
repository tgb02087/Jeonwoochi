import sound from '../bgm/Thought Soup.mp3';

const bgm = new Audio(sound);

export function bgmStart() {
  bgm.volume = 0.08;
  bgm.loop = true;
  bgm.play();
}

export function bgmOff() {
  bgm.pause();
  bgm.currentTime = 0;
}
