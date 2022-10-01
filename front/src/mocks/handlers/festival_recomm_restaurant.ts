import { rest } from 'msw';

export interface Restaurant {
  id: number;
  lat: number;
  lng: number;
}

/**
 * @description
 * API 명세서에 경로가 따로 없어서 제가 맘대로 끄적였습니다.
 * 나중에 이부분 만들어지면 맞게 바꿀 예정입니다.
 *
 * @author bell
 */

const restaurantData: Restaurant[] = [
  {
    id: 0,
    lat: 35.799273,
    lng: 126.893942,
  },
  {
    id: 1,
    lat: 35.799482,
    lng: 126.890526,
  },
  {
    id: 2,
    lat: 35.799982,
    lng: 126.892526,
  },
  {
    id: 3,
    lat: 35.799962,
    lng: 126.892546,
  },
  {
    id: 4,
    lat: 35.797982,
    lng: 126.896526,
  },
];

export default rest.get(
  '/festival_service/recomm/restaurant',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(restaurantData));
  },
);
