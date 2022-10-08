import { MapData } from './../mocks/handlers/festival_list';
import axios from 'axios';

const getSelectedFestivals = async () => {
  try {
    const { data }: { data: MapData[] } = await axios({
      method: 'GET',
      url: '/festival-service/festival/top3',
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default getSelectedFestivals;
