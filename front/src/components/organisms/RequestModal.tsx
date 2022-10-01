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
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Select from '../atoms/Select';
import postFestivalRequest from '../../api/postFestivalRequest';

interface PropTypes {
  setState: Dispatch<SetStateAction<boolean>>;
}
interface InputTypes {
  [index: string]: string;
  festivalName: string;
  startDate: string;
  endDate: string;
  address: string;
}
const StyledRequestModal = styled.div`
  width: 40vw;
  height: 60vh;
  z-index: 1;
`;
const InnerSheet = styled.div`
  ${tw`flex flex-col justify-between`}
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
  ['select'],
  ['description', 'text'],
];
const labelProps = [
  '축제 이름',
  '축제 시작일',
  '축제 종료일',
  '축제 주소',
  '포스터 이미지',
  '카테고리',
  '축제 설명',
];
/**
 * 축제 요청 모달. 로그인한 유저만 요청 가능.
 * Inputs들을 전부 채워야 요청 가능
 *
 * @author jojo
 */
const RequestModal = ({ setState }: PropTypes) => {
  const [inputs, setInputs] = useState<InputTypes>({
    festivalName: '',
    startDate: '',
    endDate: '',
    address: '',
  });
  const [select, setSelect] = useState(0);
  const [textarea, setTextarea] = useState('');

  const [isAllFilled, setIsAllFilled] = useState(true);
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  );
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setInputs(prev => ({
      ...prev,
      address: fullAddress,
    }));
  };
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  const submitRequest = () => {
    // inputs에 빈 값이 있는지 확인
    Object.keys(inputs).forEach(key => {
      if (inputs[key].trim() === '') {
        setIsAllFilled(false);
      }
    });
    if (!isAllFilled) return;

    // 포스터 이미지 element 가져오기
    const inputEle: HTMLInputElement | null =
      document.querySelector('#posterSrc');

    // file, select나 textarea에 빈 값이 있는지 확인
    if (inputEle?.value === '' || select === 0 || textarea.trim() === '') {
      setIsAllFilled(false);
      return;
    }
    // input 값들이 모두 입력되어 있음. 데이터 서버로 전송.
    setIsAllFilled(true);

    const formData = new FormData();
    const file = inputEle?.files?.[0];

    if (file) formData.append('img', file);
    const obj = {
      ...inputs,
      festivalTypeId: select,
      description: textarea,
    };
    formData.append(
      'data',
      new Blob([JSON.stringify(obj)], {
        type: 'application/json',
      }),
    );
    console.log(inputs);
    console.log(select);

    postFestivalRequest(formData);
  };
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
              if (idx >= 4) return;
              return (
                <InputLine>
                  <FlexLabel>
                    <Label color="white" htmlFor={arr[0]}>
                      {labelProps[idx]}
                    </Label>
                  </FlexLabel>
                  <FlexInput>
                    <Input
                      type={arr[1]}
                      name={arr[0]}
                      id={arr[0]}
                      value={inputs}
                      setValue={setInputs}
                      handleClick={handleClick}
                    />
                  </FlexInput>
                </InputLine>
              );
            })}
            <InputLine>
              <FlexLabel>
                <Label color="white" htmlFor={inputProps[4][0]}>
                  {labelProps[4]}
                </Label>
              </FlexLabel>
              <FlexInput>
                <Input
                  type={inputProps[4][1]}
                  name={inputProps[4][0]}
                  id={inputProps[4][0]}
                  accept={inputProps[4][2]}
                  className="file-uploader"
                />
              </FlexInput>
            </InputLine>
            <InputLine>
              <FlexLabel>
                <Label color="white" htmlFor={inputProps[5][0]}>
                  {labelProps[5]}
                </Label>
              </FlexLabel>
              <FlexInput>
                <Select
                  value={select}
                  setValue={setSelect}
                  name={inputProps[6][0]}
                  id={inputProps[6][0]}
                />
              </FlexInput>
            </InputLine>
            <InputLine>
              <FlexLabel>
                <Label color="white" htmlFor={inputProps[6][0]}>
                  {labelProps[6]}
                </Label>
              </FlexLabel>
              <FlexInput>
                <Textarea
                  id={inputProps[6][0]}
                  height={15}
                  setValue={setTextarea}
                />
              </FlexInput>
            </InputLine>
            {isAllFilled ? null : (
              <Text message="모든 항목을 입력해주세요!" color="red" />
            )}
          </SheetBody>
          <SubmitButton>
            <Button isText clickHandler={submitRequest}>
              <Text message="제출" />
            </Button>
          </SubmitButton>
        </InnerSheet>
      </Sheet>
    </StyledRequestModal>
  );
};

export default RequestModal;
