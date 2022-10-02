import { useQuery } from '@tanstack/react-query';
import getLeisureData from '../api/getLeisureData';
import { Leisure } from '../mocks/handlers/festival_recomm_leisure';
// import { Leisur } from '../mocks/handlers/festival_recomm_culture';

export const useGetLeisureDataAfterClick = () =>
  useQuery<Leisure[]>(['festival_service/recomn/leisure'], getLeisureData, {
    enabled: false,
    cacheTime: 0,
  });
