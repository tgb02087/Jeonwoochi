import axios from 'axios';

const getFestivalList = async () => {
  const {
    data: { data },
  } = await axios({
    method: 'GET',
    url: '/festival-service/list',
  });
  return data;
};

export default getFestivalList;
