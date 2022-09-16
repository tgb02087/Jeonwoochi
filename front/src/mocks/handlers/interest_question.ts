import { rest } from 'msw';

export default rest.get('/interest-service/question', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      questions: [
        {
          id: 0,
          content: '여자친구랑 가고 싶은 축제는?',
        },
        {
          id: 1,
          content: '한달 살기하면 가고 싶은 지역은?',
        },
        {
          id: 2,
          content: '1박 2일 휴가가 생겼다! 지금 당장 가고 싶은 곳은?',
        },
        {
          id: 3,
          content: '부모님을 모시고 가고 싶은 축제는?',
        },
        {
          id: 4,
          content: '좋아하는 음식은?',
        },
      ],
    }),
  );
});
