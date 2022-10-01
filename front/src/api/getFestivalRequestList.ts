import { MapData } from './../mocks/handlers/festival_list';
import axios from 'axios';

const getFestivalRequestList = async (page: number, size: number) => {
  console.log(page);

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
