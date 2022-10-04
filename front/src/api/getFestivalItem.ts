import axios from 'axios';

// 이제 사용하지 않음
const getFestivalItem = async (id: number) => {
  const { data } = await axios({
    method: 'GET',
    url: '/festival-service/festival/' + id,
  });
  console.log(data);

  return data;
};

export default getFestivalItem;
