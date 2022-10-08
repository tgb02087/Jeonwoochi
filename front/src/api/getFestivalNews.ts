import axios from 'axios';

const getFestivalNews = async (keyword: string) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `/main-service/api/search`,
      params: {
        keyword,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getFestivalNews;
