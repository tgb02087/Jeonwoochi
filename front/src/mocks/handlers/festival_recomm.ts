import { rest } from 'msw';

export default rest.get('/festival-service/recomm', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      questions: [
        {
          id: 0,
          title: '산천어 축제',
          src: 'https://picsum.photos/seed/picsum/250/300',
        },
        {
          id: 1,
          title: '유성온천 축제',
          src: 'https://picsum.photos/seed/picsum/250/300',
        },
        {
          id: 2,
          title: '김제 무슨 축제',
          src: 'https://picsum.photos/seed/picsum/250/300',
        },
      ],
    }),
  );
});
