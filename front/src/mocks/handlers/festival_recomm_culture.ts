import { rest } from 'msw';

export interface Culture {
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

const cultureData: Culture[] = [
  {
    id: 0,
    lat: 35.795382,
    lng: 126.891726,
  },
  {
    id: 1,
    lat: 35.799743,
    lng: 126.890483,
  },
  {
    id: 2,
    lat: 35.799482,
    lng: 126.887322,
  },
  {
    id: 3,
    lat: 35.790382,
    lng: 126.898361,
  },
  {
    id: 4,
    lat: 35.794832,
    lng: 126.895555,
  },
];

export default rest.get('/festival_service/recomm/culture', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(cultureData));
});
