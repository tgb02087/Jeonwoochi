import { useQuery } from '@tanstack/react-query';
import getFoodData from '../api/getFoodData';
import { Restaurant } from '../mocks/handlers/festival_recomm_restaurant';

export const useGetFoodDataAfterClick = (
  lat: number,
  lng: number,
  userId: number,
) =>
  useQuery<Restaurant[]>(
    ['festival_service/recomn/restaurant'],
    () => getFoodData(lat, lng, userId),
    {
      enabled: false,
      cacheTime: 0,
    },
  );
