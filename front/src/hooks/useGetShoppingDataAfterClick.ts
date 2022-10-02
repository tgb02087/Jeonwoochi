import { useQuery } from '@tanstack/react-query';
import getShoppingData from '../api/getShoppingData';
import { Shopping } from '../mocks/handlers/festival_recomm_shopping';

export const useGetShoppingDataAfterClick = () =>
  useQuery<Shopping[]>(['festival_service/recomn/shopping'], getShoppingData, {
    enabled: false,
    cacheTime: 0,
  });
