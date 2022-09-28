import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Restaurant } from '../../mocks/handlers/festival_recomm_dist';

import sound from '../../effect/pickup.wav';

export const useGetFoodDataAfterClick = () =>
  useQuery<Restaurant[]>(
    ['festival_service/recomn/dist'],
    async () => {
      const response = await axios.get('/festival_service/recomm/dist');

      // 소리 삽입
      const audio = new Audio(sound);
      audio.play();

      return response.data;
    },
    {
      enabled: false,
    },
  );
