import { rest } from 'msw';

export default rest.get('/main-service/api/search', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      data: [
        {
          title: '달밤소풍, 이제는 대전의 자랑으로',
          link: 'http://www.cmbdj.co.kr/ab-991-22621',
        },
        {
          title: `대전시 핫플 '달밤 소풍'... 세종시 '문화·관광·경제 활성화' 롤모델`,
          link: 'http://www.dtnews24.com/news/articleView.html?idxno=729563',
        },
        {
          title: '[문화] 대전엑스포서 펼치는 ‘달밤소풍’ 놀러오세요',
          link: 'http://www.joongdo.co.kr/web/view.php?key=20220616010003416',
        },
      ],
    }),
  );
});
