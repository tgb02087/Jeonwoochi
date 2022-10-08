import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

const submitRequest = async (
  requestId: number,
  setState: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    await axios({
      method: 'POST',
      url: '/festival-service/festival',
      data: {
        festivalFormId: requestId,
      },
    });
    setState(prev => !prev);
    window.alert('축제 승인 완료');
  } catch (e) {
    console.log(e);
  }
};

export default submitRequest;
