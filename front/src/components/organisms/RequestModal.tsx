import { Dispatch, SetStateAction, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Sheet from '../atoms/Sheet';
import Text from '../atoms/Text';
import Textarea from '../atoms/Textarea';
import TitleCancelHeader from './TitleCancelHeader';

interface PropTypes {
  setState: Dispatch<SetStateAction<boolean>>;
}
const StyledRequestModal = styled.div`
  width: 40vw;
  height: 60vh;
  z-index: 1;
`;
const InnerSheet = styled.div`
  ${tw`flex flex-col`}
  width: 100%;
  height: 60vh;
  gap: 1rem;
`;
const SheetBody = styled.div`
  ${tw`flex flex-col items-center`}
  width: 100%;
  gap: 1rem;
`;
const InputLine = styled.div`
  ${tw`flex`}
  width: 90%;
  gap: 1rem;
`;
const FlexLabel = styled.div`
  ${tw`flex justify-end`}
  width: 30%;
`;
const FlexInput = styled.div`
  ${tw`flex justify-start`}
  width: 70%;
`;
const SubmitButton = styled.div`
  ${tw`flex justify-center`}
  width: 100%;
`;
const inputProps = [
  ['festivalName', 'text'],
  ['startDate', 'date'],
  ['endDate', 'date'],
  ['address', 'text'],
  ['posterSrc', 'file', 'image/*'],
  ['description', 'text'],
];
const labelProps = [
  '축제 이름',
  '축제 시작일',
  '축제 종료일',
  '축제 주소',
  '포스터 이미지',
  '축제 설명',
];
/**
 * 축제 별 모달 컴포넌트
 * Sheet 안에 Header, Body로 나뉘고
 * LeftBody에는 포스터, RightBody에는 축제 정보
 *
 * @author jojo
 */
const RequestModal = ({ setState }: PropTypes) => {
  const [inputs, setInputs] = useState({
    festivalName: '',
    start: '',
    end: '',
    host: '',
    posterSrc: '',
  });
  const [textarea, setTextarea] = useState('');
  return (
    <StyledRequestModal>
      <Sheet transparent>
        <InnerSheet>
          <TitleCancelHeader
            setState={setState}
            title="축제 요청"
            color="white"
          />
          <SheetBody>
            {inputProps.map((arr, idx) => {
              if (idx === 5) return;
              return (
                <InputLine>
                  <FlexLabel>
                    <Label color="white" htmlFor={arr[0]}>
                      {labelProps[idx]}
                    </Label>
                  </FlexLabel>
                  {/* input type이 file이면 이미지만 선택 가능하게 accept prop 추가 */}
                  <FlexInput>
                    {arr[1] === 'file' ? (
                      <Input
                        type={arr[1]}
                        name={arr[0]}
                        id={arr[0]}
                        setValue={setInputs}
                        accept={arr[2]}
                      />
                    ) : (
                      <Input
                        type={arr[1]}
                        name={arr[0]}
                        id={arr[0]}
                        setValue={setInputs}
                      />
                    )}
                  </FlexInput>
                </InputLine>
              );
            })}
            <InputLine>
              <FlexLabel>
                <Label color="white" htmlFor={inputProps[5][0]}>
                  {labelProps[5]}
                </Label>
              </FlexLabel>
              <FlexInput>
                <Textarea
                  id={inputProps[5][0]}
                  height={15}
                  setValue={setTextarea}
                />
              </FlexInput>
            </InputLine>
            <SubmitButton>
              <Button isText>
                <Text message="제출" />
              </Button>
            </SubmitButton>
          </SheetBody>
        </InnerSheet>
      </Sheet>
    </StyledRequestModal>
  );
};

export default RequestModal;
