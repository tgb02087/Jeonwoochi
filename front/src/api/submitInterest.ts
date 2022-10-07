import axios from 'axios';

const submitInterest = async (interests: any, navigate: any) => {
  console.log(interests);

  try {
    await axios({
      method: 'POST',
      url: '/main-service/interest',
      data: interests,
    });
    localStorage.setItem('isAlreadyJoined', 'true');
    window.alert('관심사가 선택되었습니다!');
    navigate('/game');
  } catch (e) {
    console.log(e);
  }
};

export default submitInterest;
