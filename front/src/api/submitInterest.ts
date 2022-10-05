import axios from 'axios';

const submitInterest = async (interests: any) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/main-service/interest',
      data: interests,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default submitInterest;
