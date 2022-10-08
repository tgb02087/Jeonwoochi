import { rest } from 'msw';

// "{
//   ""restaurant_id"": 1 # 음식점 고유번호
//   ""name"": 전우치 돈까스 # 음식점 이름
//   ""branch"": 봉명점 # 음식점 지점 여부
//   ""tel"": 010-0000-0000 # 음식점 번호
//   ""address"": 대전시 유성구 # 음식점 주소
//   ""lat"":  # 음식점 위도
//   ""lng"":  # 음식점 경도
//   ""category"": 아구찜|돈까스 # 음식점 카테고리
// }"

export interface Restaurant {
  restaurant_id: number;
  name: string;
  branch: string;
  tel: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
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
    restaurant_id: 0,
    name: '아가방',
    branch: '김제점',
    tel: '063-544-1515',
    address: '전라북도 김제시 화동길 37',
    lat: 35.799273,
    lng: 126.893942,
    category: '유아용품',
  },
  // {
  //   id: 1,
  //   lat: 35.799482,
  //   lng: 126.890526,
  // },
  // {
  //   id: 2,
  //   lat: 35.799982,
  //   lng: 126.892526,
  // },
  // {
  //   id: 3,
  //   lat: 35.799962,
  //   lng: 126.892546,
  // },
  // {
  //   id: 4,
  //   lat: 35.797982,
  //   lng: 126.896526,
  // },
];

export default rest.get(
  '/festival_service/recomm/restaurant',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(restaurantData));
  },
);
