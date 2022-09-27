import axios from 'axios';

const getFestivalNews = async (keyword: string) => {
  try {
    if (!keyword) throw new Error('waiting for keyword');
    const { data } = await axios({
      method: 'GET',
      url: `/main-service/api/search`,
      params: {
        keyword,
      },
    });
    return data.data;
  } catch (e) {
    console.log(e);
  }
};

export default getFestivalNews;
