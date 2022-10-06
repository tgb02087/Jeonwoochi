import { useQuery } from '@tanstack/react-query';
import getCultureData from '../api/getCultureData';
import { Culture } from '../mocks/handlers/festival_recomm_culture';

export const useGetCultureDataAfterClick = (lat: number, lng: number) =>
  useQuery<Culture[]>(
    ['festival_service/recomn/culture'],
    () => getCultureData(lat, lng),
    {
      enabled: false,
      cacheTime: 0,
    },
  );
