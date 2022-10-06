import axios from 'axios';

import sound from '../effect/walk.wav';

const getCultureData = async (lat: number, lng: number) => {
  try {
    // const response = await axios.get('/festival_service/recomm/culture');

    // 소리 삽입
    const audio = new Audio(sound);
    audio.volume = 0.2;
    audio.play();
    const { data } = await axios({
      method: 'GET',
      url: '/main-service/lodgment',
      params: {
        lat: lng,
        lng: lat,
      },
      // withCredentials: true,
    });

    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getCultureData;
