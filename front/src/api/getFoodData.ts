import axios from 'axios';

import sound from '../effect/walk.wav';
import { festivalRequestId } from '../recoil/atoms/festivalRequestId';

const getFoodData = async (lat: number, lng: number) => {
  try {
    const audio = new Audio(sound);
    audio.volume = 0.2;
    audio.play();

    console.log(festivalRequestId);

    const { data } = await axios({
      method: 'POST',
      url: '/recomm-service/r_cf/74999',
      data: {
        lat: lng,
        lng: lat,
      },
      // withCredentials: true,
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
