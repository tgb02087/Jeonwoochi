import { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useQuery } from '@tanstack/react-query';
import getInterestAnswers from '../../api/getInterestAnswers';
import InterestCards from '../organisms/InterestCards';
import PageButtons from '../organisms/PageButtons';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import CharacterQuestion from '../organisms/CharacterQuestion';
import getInterestQuestions from '../../api/getInterestQuestions';

const WholePage = styled.div`
  ${tw`flex justify-center`}
`;
const StyledInterest = styled.div`
  ${tw`flex flex-col justify-evenly`}
  width: 80%;
  height: 90vh;
`;
const ButtonsArea = styled.div`
  ${tw`flex`}
`;
const InvisibleButton = styled.div`
  visibility: hidden;
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
    getInterestAnswers,
    { staleTime: 1000 * 20 },
  );
  const result = useQuery(['questions'], getInterestQuestions, {
    staleTime: 1000 * 20,
  });

  // 이렇게 하면 data가 undefined일 때 len이 0이라 clickStates가 빈 배열이 됨.
  // loading이 끝나서 data 값이 바뀌어도 clickStates는 바뀌지 않음... 어떻게 바꾸지
  // const len: number = data ? data.length * data[0].length : 0;
  const len = 20;
  const [clickStates, setClickStates] = useState(new Array(len).fill(false));
  const [page, setPage] = useState(0);

  return (
    <WholePage>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error...</div>
      ) : (
        <StyledInterest>
          <InterestCards
            idx={page}
            answers={data}
            clickStates={clickStates}
            setClickStates={setClickStates}
          />
          <ButtonsArea>
            <InvisibleButton>
              <Button isText>
                <Text message="skip" />
              </Button>
            </InvisibleButton>
            <PageButtons
              totalPage={5}
              page={page}
              setPage={setPage}
              pagingColor="black"
            />
            <Button isText>
              <Text message="skip" color="black" />
            </Button>
          </ButtonsArea>
          <CharacterQuestion question={result.data?.[page].content} />
        </StyledInterest>
      )}
    </WholePage>
  );
};

export default Interest;
