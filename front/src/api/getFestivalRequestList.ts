import axios from 'axios';

const getFestivalRequestList = async (page: number, size: number) => {
  const { data } = await axios({
    method: 'GET',
    url: '/api/festival-service/festival-form',
    params: {
      page,
      size,
    },
  });
  return data;
};

export default getFestivalRequestList;
