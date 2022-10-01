import axios from 'axios';

const postFestivalRequest = async (formData: any) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/api/festival-service/festival-form',
      data: formData,
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default postFestivalRequest;
