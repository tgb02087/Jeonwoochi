import { rest } from 'msw';

export interface Lodge {
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

const lodgeData: Lodge[] = [
  {
    id: 0,
    lat: 35.792983,
    lng: 126.894881,
  },
  {
    id: 1,
    lat: 35.799301,
    lng: 126.890222,
  },
  {
    id: 2,
    lat: 35.799555,
    lng: 126.892777,
  },
  {
    id: 3,
    lat: 35.791021,
    lng: 126.894021,
  },
  {
    id: 4,
    lat: 35.792732,
    lng: 126.892901,
  },
];

export default rest.get('/festival_service/recomm/lodge', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(lodgeData));
});
