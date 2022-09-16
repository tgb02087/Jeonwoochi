import { useQuery } from '@tanstack/react-query';

import { MapData } from '../../mocks/handlers/festival_list';
import axios, { AxiosError } from 'axios';
import KakaoMap from '../atoms/KakaoMap';

import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const StyledMapAPI = styled.div`
  ${tw`h-screen`}
`;

/**
 * @description
 * 동적 라우팅 id 값을 읽어, atoms의 kakaoMap 컴포넌트에
 * 해당 축제의 lat, lng를 보내주는 컴포넌트
 * kakaoMap에 추가적으로 데이터가 필요한 경우
 * 확장 예정
 * @author bell
 */
const MapAPI = () => {
  const { id } = useParams<{ id?: string | undefined }>();

  const MAPIDX = id && parseInt(id);
  const { isLoading, error, data } = useQuery<MapData[], AxiosError>(
    ['Maps'],
    async () => {
      const response = await axios.get('/festival-service/list');
      return response.data;
    },
  );

  const getCoordHandler = (idx: number) => {
    const result = data!.filter(d => d.festivalId === idx);
    return {
      lat: result[0].lat,
      lng: result[0].lng,
    };
  };

  return (
    <StyledMapAPI>
      {isLoading || !MAPIDX ? (
        'Loading...'
      ) : error ? (
        <div>error: {error.message}</div>
      ) : data ? (
        <KakaoMap coord={getCoordHandler(MAPIDX)} />
      ) : (
        <div>somthing went wrong!</div>
      )}
    </StyledMapAPI>
  );
};

export default MapAPI;
