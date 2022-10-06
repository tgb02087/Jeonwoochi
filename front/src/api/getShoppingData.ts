import axios from 'axios';

import sound from '../effect/walk.wav';

const getFoodData = async (lat: number, lng: number) => {
  try {
    // const response = await axios.get('/festival_service/recomm/shopping');

    // 소리 삽입
    const audio = new Audio(sound);
    audio.volume = 0.2;
    audio.play();

    const { data } = await axios({
      method: 'GET',
      url: '/main-service/shopping',
      params: {
        lat: lat,
        lng: lng,
      },
      // withCredentials: true,
    });

    console.log(data);

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getFoodData;
