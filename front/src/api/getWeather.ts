import axios from 'axios';

const getWeather = async () => {
  const { data } = await axios({
    method: 'GET',
    url: `/api/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.REACT_APP_WEATHER_KEY}`,
    params: {
      pageNo: 1,
      numOfRows: 10,
      dataType: 'JSON',
      base_date: 20220923,
      base_time: '0630',
      nx: 55,
      ny: 127,
      // regId: '11C20000',
      // startDt: '20220920',
      // endDt: '20220922',
      // dataCd: 'ASOS',
      // dateCd: 'DAY',
      // stnIds: 108,
      // tmFc: '202209220600',
    },
  });
  console.log(data);

  return data?.response?.body?.items;
};

export default getWeather;
