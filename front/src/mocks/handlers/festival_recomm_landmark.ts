import { rest } from 'msw';

export interface Landmark {
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

const landmarkData: Landmark[] = [
  {
    id: 0,
    lat: 35.792382,
    lng: 126.889826,
  },
  {
    id: 1,
    lat: 35.794543,
    lng: 126.893483,
  },
  {
    id: 2,
    lat: 35.797632,
    lng: 126.883322,
  },
  {
    id: 3,
    lat: 35.795382,
    lng: 126.892932,
  },
  {
    id: 4,
    lat: 35.779372,
    lng: 126.851231,
  },
];

export default rest.get(
  '/festival_service/recomm/landmark',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(landmarkData));
  },
);
