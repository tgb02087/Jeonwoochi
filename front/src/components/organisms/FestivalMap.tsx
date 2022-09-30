import React from 'react';
import KakaoMap from '../atoms/KakaoMap';
import tw from 'twin.macro';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

import { Restaurant } from '../../mocks/handlers/festival_recomm_restaurant';
import { Lodge } from '../../mocks/handlers/festival_recomm_lodge';

interface PropTypes {
  coord: {
    lat: number;
    lng: number;
  };
  restaurantData?: Restaurant[] | undefined;
  lodgeData?: Lodge[] | undefined;
  // clickHandler?: Array<React.MouseEventHandler<HTMLButtonElement>> | undefined;
  restaurantRecommClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  lodgeRecommClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

// 맛집 추천 position 설정용 STMP
const PositionButton = styled.button`
  ${tw`flex justify-between absolute bottom-5 right-5 z-10`}
  // 일단 그냥 고정값으로 넣음
  width: 14rem;
`;

/**
 *
 * @description
 * 맛집 추천 버튼과 카카오맵 컴포넌트가
 * 혼합된 컴포넌트
 * @author bell
 */

const FestivalMap = ({
  coord,
  restaurantRecommClickHandler,
  lodgeRecommClickHandler,
  restaurantData,
}: PropTypes) => {
  return (
    <>
      <PositionButton>
        <Button isText={true} clickHandler={restaurantRecommClickHandler}>
          <Text message={'맛집 추천'} />
        </Button>
        <Button isText={true} clickHandler={lodgeRecommClickHandler}>
          <Text message={'숙박 추천'} />
        </Button>
      </PositionButton>
      <KakaoMap restaurantData={restaurantData} coord={coord} />
    </>
  );
};

export default FestivalMap;
