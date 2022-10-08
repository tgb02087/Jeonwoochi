import axios from 'axios';

const getInterestQuestions = async () => {
  const {
    data: { questions },
  } = await axios({
    method: 'GET',
    url: '/interest-service/question',
  });
  return questions;
};

export default getInterestQuestions;
