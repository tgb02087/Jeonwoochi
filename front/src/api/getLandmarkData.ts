import axios from 'axios';

import sound from '../effect/walk.wav';

const getLandmarkData = async () => {
  try {
    const response = await axios.get('/festival_service/recomm/landmark');

    // 소리 삽입
    const audio = new Audio(sound);
    audio.volume = 0.2;
    audio.play();

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export default getLandmarkData;
