import axios from 'axios';

const getFestivalNews = async () => {
  const ID: any = process.env.REACT_APP_NAVER_ID;
  const SECRET: any = process.env.REACT_APP_NAVER_SECRET;

  const {
    data: { items },
  } = await axios({
    method: 'GET',
    url: `/api/v1/search/news.json`,
    headers: {
      'X-Naver-Client-Id': ID,
      'X-Naver-Client-Secret': SECRET,
    },
    params: {
      query: '산천어축제',
    },
  });
  return items;
};

export default getFestivalNews;
