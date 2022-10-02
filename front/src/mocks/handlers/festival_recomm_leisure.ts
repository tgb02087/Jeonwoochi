import { rest } from 'msw';

export interface Leisure {
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

const leisureData: Leisure[] = [
  {
    id: 0,
    lat: 35.794282,
    lng: 126.891926,
  },
  {
    id: 1,
    lat: 35.792633,
    lng: 126.892983,
  },
  {
    id: 2,
    lat: 35.794241,
    lng: 126.881232,
  },
  {
    id: 3,
    lat: 35.790302,
    lng: 126.892521,
  },
  {
    id: 4,
    lat: 35.772222,
    lng: 126.854565,
  },
];

export default rest.get('/festival_service/recomm/leisure', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(leisureData));
});
