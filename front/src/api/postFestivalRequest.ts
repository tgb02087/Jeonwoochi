import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

const postFestivalRequest = async (
  formData: any,
  setState: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    await axios({
      method: 'POST',
      url: '/festival-service/festival-form',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    setState(prev => !prev);
    window.alert('성공적으로 축제 요청이 완료되었습니다!');
  } catch (e) {
    console.log(e);
  }
};

export default postFestivalRequest;
