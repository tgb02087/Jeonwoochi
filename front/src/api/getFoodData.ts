import axios from 'axios';

import sound from '../effect/walk.wav';

const getFoodData = async (lat: number, lng: number, userId: number) => {
  try {
    const audio = new Audio(sound);
    audio.volume = 0.2;
    audio.play();

    console.log(userId);

    const { data } = await axios({
      method: 'POST',
      url: `/recomm-service/r_cf/`,
      data: {
        lat: lng,
        lng: lat,
      },
      withCredentials: true,
    });

    console.log(data);
    return data;

    // 소리 삽입

    // return response.data;
  } catch (e) {
    console.log(e);
  }
};

export default getFoodData;
