import { useQuery } from '@tanstack/react-query';
import getLandmarkData from '../api/getLandmarkData';
import { Landmark } from '../mocks/handlers/festival_recomm_landmark';

export const useGetLandmarkDataAfterClick = () =>
  useQuery<Landmark[]>(['festival_service/recomn/landmark'], getLandmarkData, {
    enabled: false,
    cacheTime: 0,
  });
