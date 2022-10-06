import { useQuery } from '@tanstack/react-query';
import { Lodge } from '../mocks/handlers/festival_recomm_lodge';
import getLodgeData from '../api/getLodgeData';
// import getFoodData from '../api/getFoodData';
// import { Restaurant } from '../mocks/handlers/festival_recomm_dist';

export const useGetLodgeDataAfterClick = (lat: number, lng: number) =>
  useQuery<Lodge[]>(
    ['/festival_service/recomm/lodge'],
    () => getLodgeData(lat, lng),
    {
      enabled: false,
      cacheTime: 0,
    },
  );
