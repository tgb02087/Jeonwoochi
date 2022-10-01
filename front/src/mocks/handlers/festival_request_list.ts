import { rest } from 'msw';

export default rest.get(
  '/api/festival-service/festival-form',
  (req, res, ctx) => {
    const page = req.url.searchParams.get('page');

    if (page) console.log(parseInt(page));

    if (page && parseInt(page) === 0) {
      return res(
        ctx.status(200),
        ctx.json({
          content: [
            {
              id: 1,
              festivalName: '테스트 축제 이름1',
              festivalType: '테스트 카테고리1',
              startDate: '2022-08-31T15:00:00.000+00:00',
              endDate: '2022-09-29T15:00:00.000+00:00',
              description: '테스트 축제 설명1',
              address: '주소1',
              image:
                'https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/festival.jpg',
            },
            {
              id: 2,
              festivalName: '테스트 축제 이름2',
              festivalType: '테스트 카테고리1',
              startDate: '2022-08-31T15:00:00.000+00:00',
              endDate: '2022-09-29T15:00:00.000+00:00',
              description: '테스트 축제 설명2',
              address: '주소2',
              image:
                'https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/festival.jpg',
            },
            {
              id: 3,
              festivalName: '테스트 축제 이름3',
              festivalType: '테스트 카테고리1',
              startDate: '2022-08-31T15:00:00.000+00:00',
              endDate: '2022-09-29T15:00:00.000+00:00',
              description: '테스트 축제 설명3',
              address: '주소3',
              image:
                'https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/festival.jpg',
            },
            {
              id: 4,
              festivalName: '테스트 축제 이름4',
              festivalType: '테스트 카테고리1',
              startDate: '2022-08-31T15:00:00.000+00:00',
              endDate: '2022-09-29T15:00:00.000+00:00',
              description: '테스트 축제 설명4',
              address: '주소4',
              image:
                'https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/festival.jpg',
            },
            {
              id: 5,
              festivalName: '테스트 축제 이름5',
              festivalType: '테스트 카테고리1',
              startDate: '2022-08-31T15:00:00.000+00:00',
              endDate: '2022-09-29T15:00:00.000+00:00',
              description: '테스트 축제 설명5',
              address: '주소5',
              image:
                'https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/festival.jpg',
            },
          ],
          pageable: {
            sort: {
              sorted: false,
              unsorted: true,
              empty: true,
            },
            pageNumber: 0,
            pageSize: 20,
            offset: 0,
            paged: true,
            unpaged: false,
          },
          totalPages: 5,
          totalElements: 3,
          last: true,
          first: true,
          sort: {
            sorted: false,
            unsorted: true,
            empty: true,
          },
          numberOfElements: 3,
          size: 20,
          number: 0,
          empty: false,
        }),
      );
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          content: [
            {
              id: 6,
              festivalName: '테스트 축제 이름6',
              festivalType: '테스트 카테고리1',
              startDate: '2022-08-31T15:00:00.000+00:00',
              endDate: '2022-09-29T15:00:00.000+00:00',
              description: '테스트 축제 설명6',
              address: '주소6',
              image:
                'https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/festival.jpg',
            },
            {
              id: 7,
              festivalName: '테스트 축제 이름7',
              festivalType: '테스트 카테고리1',
              startDate: '2022-08-31T15:00:00.000+00:00',
              endDate: '2022-09-29T15:00:00.000+00:00',
              description: '테스트 축제 설명2',
              address: '주소2',
              image:
                'https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/festival.jpg',
            },
            {
              id: 8,
              festivalName: '테스트 축제 이름8',
              festivalType: '테스트 카테고리1',
              startDate: '2022-08-31T15:00:00.000+00:00',
              endDate: '2022-09-29T15:00:00.000+00:00',
              description: '테스트 축제 설명3',
              address: '주소3',
              image:
                'https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/festival.jpg',
            },
            {
              id: 9,
              festivalName: '테스트 축제 이름9',
              festivalType: '테스트 카테고리1',
              startDate: '2022-08-31T15:00:00.000+00:00',
              endDate: '2022-09-29T15:00:00.000+00:00',
              description: '테스트 축제 설명4',
              address: '주소4',
              image:
                'https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/festival.jpg',
            },
            {
              id: 10,
              festivalName: '테스트 축제 이름10',
              festivalType: '테스트 카테고리1',
              startDate: '2022-08-31T15:00:00.000+00:00',
              endDate: '2022-09-29T15:00:00.000+00:00',
              description: '테스트 축제 설명5',
              address: '주소5',
              image:
                'https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/festival.jpg',
            },
          ],
          pageable: {
            sort: {
              sorted: false,
              unsorted: true,
              empty: true,
            },
            pageNumber: 0,
            pageSize: 20,
            offset: 0,
            paged: true,
            unpaged: false,
          },
          totalPages: 5,
          totalElements: 3,
          last: true,
          first: true,
          sort: {
            sorted: false,
            unsorted: true,
            empty: true,
          },
          numberOfElements: 3,
          size: 20,
          number: 0,
          empty: false,
        }),
      );
    }
  },
);
