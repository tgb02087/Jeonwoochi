import { rest } from 'msw';

export default rest.get('/interest-service/answer', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      answer: [
        [
          {
            no: 0,
            content: 'A 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 1,
            content: 'B 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 2,
            content: 'C 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 3,
            content: 'D 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
        ],
        [
          {
            no: 0,
            content: 'F 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 1,
            content: 'G 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 2,
            content: 'H 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 3,
            content: 'I 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
        ],
        [
          {
            no: 0,
            content: 'K 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 1,
            content: 'L 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 2,
            content: 'M 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 3,
            content: 'N 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
        ],
        [
          {
            no: 0,
            content: 'P 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 1,
            content: 'Q 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 2,
            content: 'R 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 3,
            content: 'S 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
        ],
        [
          {
            no: 0,
            content: 'U 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 1,
            content: 'V 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 2,
            content: 'W 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
          {
            no: 3,
            content: 'X 축제',
            src: 'https://picsum.photos/seed/picsum/250/300',
          },
        ],
      ],
    }),
  );
});
