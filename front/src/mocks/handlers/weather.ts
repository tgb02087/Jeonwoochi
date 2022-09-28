import { rest } from 'msw';

export default rest.get('/main-service/api/weather', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      data: [
        {
          data: '20220927',
          sky: '1 3',
          tmx: '27.0',
          tmn: '13.0',
        },
        {
          data: '20220928',
          sky: '3',
          tmx: '28.3',
          tmn: '12.0',
        },
        {
          data: '20220929',
          sky: '4',
          tmx: '24.5',
          tmn: '11.2',
        },
      ],
    }),
  );
});
