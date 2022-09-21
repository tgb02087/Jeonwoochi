import { rest } from 'msw';

export default rest.get('/festival-service/item', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      data: {
        title: '2022 달밤소풍',
        period: '2022.07.01~2022.08.15',
        festivalUrl: 'http://planin.kr/design/subpage/subpage1.php?id=1',
        posterUrl:
          'https://www.mcst.go.kr/attachFiles/cultureInfoCourt/localFestival/notifyFestival/1655341849132.jpg',
        description: `2022 한 여름 밤의 나들이 달밤소풍은 한 여름밤, 무더위에 지친 시민들이 도시를 떠나지 않고 소풍 가듯 가볍게 피서를 즐길 수 있는 여름축제로 7월1일(금)부터 8월 15일(월)까지 약 40일간 대전 한빛탑광장에서 진행된다.
        해마다 지역의 청년 소상공인·청년 예술인· 청년 서포터즈와 함께 지역 예술축제를 구성해왔으며, 올해는 환경을 생각하는 ‘지속가능한 녹색축제’, 시민이 함께 만드는 ’시민참여축제’, 여름밤 도시에서 즐기는 ’도심형 축제’라는 3가지 키워드를 가지고 다양한 활동들을 이어갈 예정이다.`,
      },
    }),
  );
});
