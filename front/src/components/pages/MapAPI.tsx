import { useQuery } from '@tanstack/react-query';
import { MapData } from '../../mocks/handlers/mock-map';
import axios, { AxiosError } from 'axios';
import KakaoMap from '../atoms/KakaoMap';

const MAPIDX = 1;

const MapAPI = (): JSX.Element => {
  const {
    isLoading,
    data: maps,
    error,
  } = useQuery<MapData[], AxiosError>(['Maps'], async () => {
    const response = await axios.get('/festivalData');
    return response.data;
  });

  if (isLoading) return <div>로딩중</div>;
  else if (error) return <div>에러</div>;
  else if (maps) {
    const getCoordHandler = (idx: number) => {
      const result = maps.filter(map => map.festivalId === idx);
      return {
        lat: result[0].lat,
        lng: result[0].lng,
      };
    };

    return (
      <div>
        <KakaoMap coord={getCoordHandler(MAPIDX)} />
      </div>
    );
  }
  return <div>알 수없는 에러</div>;
};

export default MapAPI;
