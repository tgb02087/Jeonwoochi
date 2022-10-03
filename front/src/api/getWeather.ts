import axios from 'axios';

const getWeather = async (x: number, y: number) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/main-service/api/weather',
      params: {
        x,
        y,
      },
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getWeather;
