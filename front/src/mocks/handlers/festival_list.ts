import { rest } from 'msw';

export interface MapData {
  id: number;
  festivalName: string;
  startDate: Date;
  endDate: Date;
  address: string;
  image: string;
  fee: string;
  description: string;
  homepage: string;
  lat: number;
  lng: number;
}

/**
 * @description
 * mock-server : map
 *
 * @author bell
 */
const mapData: MapData[] = [
  {
    id: 0,
    festivalName: 'Sample festival',
    startDate: new Date('2022-08-22'),
    endDate: new Date('2022-10-07'),
    description: 'SSAFY 7기 특화 프로젝트 진행 중...',
    address: '서울특별시 송파구 백제고분로44길 13-25',
    image: '',
    fee: '무료',
    homepage: '',
    lat: 127.11313422641568,
    lng: 37.50708968446814,
  },
  {
    id: 1,
    festivalName: '김제지평선축제',
    startDate: new Date('2022-10-24'),
    endDate: new Date('2022-10-31'),
    description:
      '전국 축제 1등! 김제 지평선 축제!!! 하늘과 땅이 만나는 곳 지평선으로 놀러오세요',
    address: '전라북도 김제시 화동길 37 아가방 김제점',
    image: '',
    fee: '1억',
    homepage: '',
    lat: 126.89094137623249,
    lng: 35.799173454870235,
  },
  {
    id: 2,
    festivalName: '전주국제영화제',
    startDate: new Date('2022-11-31'),
    endDate: new Date('2022-12-24'),
    description: '맛과 영화의 도시 전주!! 전주국제영화제로 오세요!',
    address: '전북 전주시 덕진구 덕진동1가',
    image: '',
    fee: '1000원',
    homepage: '',
    lat: 127.126143385886,
    lng: 35.8489873847612,
  },
];

export default rest.get('/festival-service/list', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(mapData));
});
