import { MapData } from './../mocks/handlers/festival_list';
import axios from 'axios';

const getFestivalDoubleList = async () => {
  const { data }: { data: Array<MapData[]> } = await axios({
    method: 'GET',
    url: '/festival-service/festival/sort/list',
  });

  return data;
};

export default getFestivalDoubleList;
