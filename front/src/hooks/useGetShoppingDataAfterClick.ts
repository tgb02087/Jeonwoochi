import { useQuery } from '@tanstack/react-query';
import getShoppingData from '../api/getShoppingData';
import { Shopping } from '../mocks/handlers/festival_recomm_shopping';

export const useGetShoppingDataAfterClick = (lat: number, lng: number) =>
  useQuery<Shopping[]>(
    ['festival_service/recomn/shopping'],
    () => getShoppingData(lat, lng),
    {
      enabled: false,
      cacheTime: 0,
    },
  );
