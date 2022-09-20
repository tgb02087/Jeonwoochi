import axios from 'axios';

const getInterestAnswers = async () => {
  const {
    data: { answer },
  } = await axios({
    method: 'GET',
    url: '/interest-service/answer',
  });
  return answer;
};

export default getInterestAnswers;
