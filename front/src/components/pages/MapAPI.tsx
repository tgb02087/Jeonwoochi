import { useQuery } from '@tanstack/react-query';

import { MapData } from '../../mocks/handlers/festival_list';
import axios, { AxiosError } from 'axios';
import KakaoMap from '../atoms/KakaoMap';

import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';

const MapAPIContainer = styled.div`
  ${tw`flex flex-row`}
`;

// 일단은 그냥 고정값으로 만들었습니다!
// 축제 상세 페이지 제작자 분께서 원하시는데로,
// STCP 변경하시기 바랍니다.
const StyledFestivalDetail = styled.div`
  ${tw`w-96`}
`;

const StyledMapAPI = styled.div`
  ${tw`w-full h-screen`}
`;

/**
 * @description
 * 동적 라우팅 id 값을 읽어, atoms의 kakaoMap 컴포넌트에
 * 해당 축제의 lat, lng를 보내주는 컴포넌트
 * kakaoMap에 추가적으로 데이터가 필요한 경우
 * 추후 축제 상세페이지와 함께 다양한 이벤트(메인기술) 적용 예정
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
    <MapAPIContainer>
      <StyledFestivalDetail>
        <div>축제 상세 설명 들어오는 곳</div>
      </StyledFestivalDetail>
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
    </MapAPIContainer>
  );
};

export default MapAPI;
