import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Restaurant } from '../../mocks/handlers/festival_recomm_dist';

export const useGetFoodDataAfterClick = () =>
  useQuery<Restaurant[]>(
    ['festival_service/recomn/dist'],
    async () => {
      const response = await axios.get('/festival_service/recomm/dist');
      // console.log(response.data);
      return response.data;
    },
    {
      enabled: false,
    },
  );
