import { useQuery } from '@tanstack/react-query';
import getFoodData from '../api/getFoodData';
import { Restaurant } from '../mocks/handlers/festival_recomm_restaurant';

export const useGetFoodDataAfterClick = () =>
  useQuery<Restaurant[]>(['festival_service/recomn/restaurant'], getFoodData, {
    enabled: false,
    cacheTime: 0,
  });
