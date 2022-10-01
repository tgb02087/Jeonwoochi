import React, { useState } from 'react';
import KakaoMap from '../atoms/KakaoMap';
import tw from 'twin.macro';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

import { Restaurant } from '../../mocks/handlers/festival_recomm_restaurant';
import { Lodge } from '../../mocks/handlers/festival_recomm_lodge';
import { Shopping } from '../../mocks/handlers/festival_recomm_shopping';
import { Culture } from '../../mocks/handlers/festival_recomm_culture';

interface PropTypes {
  coord: {
    lat: number;
    lng: number;
  };
  restaurantData?: Restaurant[] | undefined;
  lodgeData?: Lodge[] | undefined;
  shoppingData?: Shopping[] | undefined;
  cultureData?: Culture[] | undefined;
  // clickHandler?: Array<React.MouseEventHandler<HTMLButtonElement>> | undefined;
  restaurantRecommClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  lodgeRecommClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  shoppingRecommClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  cultureRecommClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

// 맛집 추천 position 설정용 STMP
const PositionButton = styled.button`
  ${tw`flex justify-between absolute bottom-5 right-5 z-10`}
  // 일단 그냥 고정값으로 넣음
  width: 29rem;
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
  shoppingRecommClickHandler,
  cultureRecommClickHandler,
  restaurantData,
  lodgeData,
  shoppingData,
  cultureData,
}: PropTypes) => {
  const [isVisibleMarkerRestaurant, setIsVisibleMarkerRestaurant] =
    useState(false);
  const [isVisibleMarkerLodge, setIsVisibleMarkerLodge] = useState(false);
  const [isVisibleMarkerShopping, setIsVisibleMarkerShopping] = useState(false);
  const [isVisibleMarkerCulture, setIsVisibleMarkerCulture] = useState(false);

  const combineRecommMarkerRestaurant = () => {
    //@ts-expect-error : 매개변수를 하나 달라는데... 뭘줘야 한다는 거니...
    restaurantRecommClickHandler();
    setIsVisibleMarkerRestaurant(prev => !prev);
  };

  const combineRecommMarkerLodge = () => {
    //@ts-expect-error : 매개변수를 하나 달라는데... 뭘줘야 한다는 거니...
    lodgeRecommClickHandler();
    setIsVisibleMarkerLodge(prev => !prev);
  };

  const combineRecommMarkerShopping = () => {
    //@ts-expect-error : 매개변수를 하나 달라는데... 뭘줘야 한다는 거니...
    shoppingRecommClickHandler();
    setIsVisibleMarkerShopping(prev => !prev);
  };

  const combineRecommMarkerCulture = () => {
    //@ts-expect-error : 매개변수를 하나 달라는데... 뭘줘야 한다는 거니...
    cultureRecommClickHandler();
    setIsVisibleMarkerCulture(prev => !prev);
  };

  return (
    <>
      <PositionButton>
        <Button
          color={isVisibleMarkerRestaurant ? '#DB4455' : undefined}
          isText={true}
          clickHandler={combineRecommMarkerRestaurant}
        >
          <Text message={'맛집 추천'} />
        </Button>
        <Button
          color={isVisibleMarkerLodge ? '#DB4455' : undefined}
          isText={true}
          clickHandler={combineRecommMarkerLodge}
        >
          <Text message={'숙박 추천'} />
        </Button>
        <Button
          color={isVisibleMarkerShopping ? '#DB4455' : undefined}
          isText={true}
          clickHandler={combineRecommMarkerShopping}
        >
          <Text message={'쇼핑 추천'} />
        </Button>
        <Button
          color={isVisibleMarkerCulture ? '#DB4455' : undefined}
          isText={true}
          clickHandler={combineRecommMarkerCulture}
        >
          <Text message={'문화시설 추천'} />
        </Button>
      </PositionButton>
      <KakaoMap
        lodgeData={lodgeData}
        restaurantData={restaurantData}
        shoppingData={shoppingData}
        cultureData={cultureData}
        isVisibleMarkerRestaurant={isVisibleMarkerRestaurant}
        isVisibleMarkerLodge={isVisibleMarkerLodge}
        isVisibleMarkerShopping={isVisibleMarkerShopping}
        isVisibleMarkerCulture={isVisibleMarkerCulture}
        coord={coord}
      />
    </>
  );
};

export default FestivalMap;
