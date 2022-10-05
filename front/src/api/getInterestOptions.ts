import axios from 'axios';

const getInterestOptions = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/main-service/question',
  });
  console.log(data);

  return data;
};

export default getInterestOptions;
