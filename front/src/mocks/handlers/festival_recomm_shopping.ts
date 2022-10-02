import { rest } from 'msw';

export interface Shopping {
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

const shoppingData: Shopping[] = [
  {
    id: 0,
    lat: 35.799273,
    lng: 126.894232,
  },
  {
    id: 1,
    lat: 35.799442,
    lng: 126.890123,
  },
  {
    id: 2,
    lat: 35.799782,
    lng: 126.892421,
  },
  {
    id: 3,
    lat: 35.798371,
    lng: 126.892361,
  },
  {
    id: 4,
    lat: 35.773922,
    lng: 126.853271,
  },
];

export default rest.get(
  '/festival_service/recomm/shopping',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(shoppingData));
  },
);
