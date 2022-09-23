import axios from 'axios';

const getFestivalItem = async () => {
  const {
    data: { data },
  } = await axios({
    method: 'GET',
    url: '/festival-service/item',
  });
  return data;
};

export default getFestivalItem;
