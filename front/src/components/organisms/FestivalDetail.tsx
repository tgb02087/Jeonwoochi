import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Sheet from '../atoms/Sheet';
import Text from '../atoms/Text';
import FestivalInfos from './FestivalInfos';
import TitleCancelHeader from './TitleCancelHeader';

interface PropTypes {
  info: {
    title: string;
    period: string;
    festivalUrl: string;
    posterUrl: string;
    description: string;
  };
  navigate: NavigateFunction;
}
const StyledFestivalDetail = styled.div`
  width: 100%;
`;
const InnerSheet = styled.div`
  ${tw`flex flex-col`}
  width: 100%;
  height: 95.5vh;
  gap: 1rem;
`;
const StyledFestivalInfo = styled.div`
  ${tw`flex flex-col`}
  height: 30vh;
  gap: 1rem;
`;
const StyledPoster = styled.div`
  width: 50%;
`;
const WeatherInfo = styled.div`
  height: 30vh;
`;
/**
 * 축제 상세 정보 컴포넌트
 * 축제에 대한 기본적인 정보와 날씨, 관련 기사, 추천 맛집
 * Map API 왼쪽에 렌더링
 *
 * @author jojo
 */
const FestivalDetail = ({ info, navigate }: PropTypes) => {
  const clickHandler = () => {
    navigate(-1);
  };
  return (
    <StyledFestivalDetail>
      <Sheet>
        <InnerSheet>
          <Text
            clickHandler={clickHandler}
            color="white"
            message="< 이전 화면으로"
          />
          {info ? (
            <>
              <StyledFestivalInfo>
                <Text color="white" message={info.title} size={1.5} />
                <FestivalInfos info={info} size={1.2} />
              </StyledFestivalInfo>
              <StyledPoster>
                <Image src={info.posterUrl} alt="poster" />
              </StyledPoster>
            </>
          ) : (
            <Text color="white" message="로딩 중입니다..." />
          )}
          <WeatherInfo>
            <Text color="white" message="날씨 예보" size={1.3} />
          </WeatherInfo>
        </InnerSheet>
      </Sheet>
    </StyledFestivalDetail>
  );
};

export default FestivalDetail;
