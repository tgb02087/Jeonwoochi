import KakaoMap from '../atoms/KakaoMap';

import { useQuery } from 'react-query';
import { MapData } from '../../recoil/atoms';
import axios, { AxiosError } from 'axios';

const Map = (): JSX.Element => {
  const { isLoading, data, error } = useQuery<MapData[], AxiosError>(
    ['Maps'],
    async () => {
      const response = await axios.get('/maps');
      return response.data;
    },
  );

  if (isLoading) return <div>로딩중</div>;
  else if (error) return <div>에러</div>;
  else if (data) {
    const coord = {
      lat: data[0].lat,
      lng: data[0].lng,
    };
    return (
      <div>
        <KakaoMap coord={coord} />
      </div>
    );
  }
  return <div>알 수없는 에러</div>;
};

export default Map;
