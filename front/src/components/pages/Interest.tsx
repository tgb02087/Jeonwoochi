import { useState, useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useQuery } from '@tanstack/react-query';
import getInterestOptions from '../../api/getInterestOptions';
import checkLoginState from '../../api/checkLoginState';
import InterestCards from '../organisms/InterestCards';
import PageButtons from '../organisms/PageButtons';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import CharacterQuestion from '../organisms/CharacterQuestion';
import { useNavigate } from 'react-router-dom';
import { ClickStateTypes } from '../organisms/InterestCard';
import submitInterest from '../../api/submitInterest';
import { useSetRecoilState } from 'recoil';
import { userInfo } from '../../recoil/atoms/userInfo';

const WholePage = styled.div`
  ${tw`flex justify-center`}
`;
const StyledInterest = styled.div`
  ${tw`flex flex-col justify-evenly`}
  width: 80%;
  height: 90vh;
`;
const ButtonsArea = styled.div`
  width: 100%;
  ${tw`flex justify-between`}
`;
const VisibleButton = styled.div`
  ${tw`flex justify-end`}
  width: 30%;
`;
const InvisibleButton = styled.div`
  width: 30%;
  visibility: hidden;
`;
const Buttons = styled.div`
  ${tw`flex items-center`}
  gap: 1rem;
`;

/**
 * 관심사 페이지 컴포넌트입니다.
 * 관심사 답안 데이터를 fetch하고 클릭상태배열과 현재 페이지 상태를 선언합니다.
 * 상태들을 InterestCards 컴포넌트에 내려 렌더링하게 합니다.
 *
 * @author: jojo
 */
const Interest = () => {
  const { data, isLoading, isError } = useQuery(
    ['answers'],
    getInterestOptions,
  );
  const navigate = useNavigate();

  // 이렇게 하면 data가 undefined일 때 len이 0이라 clickStates가 빈 배열이 됨.
  // loading이 끝나서 data 값이 바뀌어도 clickStates는 바뀌지 않음... 어떻게 바꾸지
  // const len: number = data ? data.length * data[0].length : 0;
  // const [len, setLen] = useState(0);
  const len = 22;
  const [clickStates, setClickStates] = useState(
    new Array(len).fill({
      isClicked: false,
      id: 0,
    }),
  );
  const [page, setPage] = useState(0);

  // useEffect(() => {
  //   setLen(data.length * data[0].answerResponses.length);
  //   console.log(len);
  // }, [data]);

  // 로그인 여부 체크 후 받은 사용자 객체를 Recoil에 저장하는 Setter
  const setUserData = useSetRecoilState(userInfo);

  useEffect(() => {
    checkLoginState(setUserData);
  }, []);

  const submitHandler = () => {
    const clickedInterests = clickStates
      .filter(({ isClicked }: ClickStateTypes) => isClicked)
      .map(({ isClicked, id }: ClickStateTypes) => {
        if (isClicked) {
          return {
            answerId: id,
          };
        }
        return;
      });
    // 내일 return 어떻게 오는지 보고
    submitInterest(clickedInterests, navigate);
  };
  const skipHandler = () => {
    if (
      window.confirm(
        '지금 스킵하면 추천을 받기 힘들어집니다. 스킵하시겠습니까?',
      )
    )
      navigate('/game');
  };

  return (
    <WholePage>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error...</div>
      ) : (
        <StyledInterest>
          <InterestCards
            page={page}
            answers={data[page].answerResponses}
            clickStates={clickStates}
            setClickStates={setClickStates}
          />
          <ButtonsArea>
            <InvisibleButton>
              <Buttons>
                <Button isText>
                  <Text message="skip" color="black" />
                </Button>
                <Button isText>
                  <Text message="제출" color="black" />
                </Button>
              </Buttons>
            </InvisibleButton>
            <PageButtons
              totalPage={5}
              page={page}
              setPage={setPage}
              pagingColor="black"
            />
            <VisibleButton>
              <Buttons>
                <Button isText clickHandler={skipHandler}>
                  <Text message="skip" color="black" />
                </Button>
                <Button isText clickHandler={submitHandler}>
                  <Text message="제출" color="black" />
                </Button>
              </Buttons>
            </VisibleButton>
          </ButtonsArea>
          <CharacterQuestion question={data[page].question} />
        </StyledInterest>
      )}
    </WholePage>
  );
};

export default Interest;
