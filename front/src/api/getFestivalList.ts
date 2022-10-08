import { MapData } from './../mocks/handlers/festival_list';
import axios from 'axios';

const getFestivalList = async () => {
  const { data }: { data: MapData[] } = await axios({
    method: 'GET',
    url: '/festival-service/festival/list',
  });
  return data;
};

export default getFestivalList;
