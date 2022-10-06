import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Button from '../atoms/Button';
import Sheet from '../atoms/Sheet';
import Text from '../atoms/Text';
import TitleCancelHeader from './TitleCancelHeader';
import { useQuery } from '@tanstack/react-query';
import { festivalRequestPage } from '../../recoil/atoms/festivalRequestPage';
import { useRecoilState } from 'recoil';
import { festivalRequestId } from '../../recoil/atoms/festivalRequestId';
import getFestivalRequestList from '../../api/getFestivalRequestList';
import { inputProps, labelProps } from './RequestModal';
import submitRequest from '../../api/submitRequest';
import Link from '../atoms/Link';

interface PropTypes {
  setState: Dispatch<SetStateAction<boolean>>;
  setOpenedList: Dispatch<SetStateAction<boolean>>;
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
  height: 70vh;
  z-index: 1;
`;
const InnerSheet = styled.div`
  ${tw`flex flex-col justify-between`}
  width: 100%;
  height: 70vh;
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
// const inputProps = [
//   ['festivalName', 'text'],
//   ['startDate', 'date'],
//   ['endDate', 'date'],
//   ['fee', 'text'],
//   ['address', 'text'],
//   ['image', 'file', 'image/*'],
//   ['description', 'text'],
// ];
// const labelProps = [
//   '축제 이름',
//   '축제 시작일',
//   '축제 종료일',
//   '이용 요금',
//   '축제 주소',
//   '포스터 이미지',
//   '축제 설명',
// ];
/**
 * 축제 요청 모달. 로그인한 유저만 요청 가능.
 * Inputs들을 전부 채워야 요청 가능
 *
 * @author jojo
 */
const RequestConfirmModal = ({ setState, setOpenedList }: PropTypes) => {
  const [page, setPage] = useRecoilState(festivalRequestPage);
  const { data } = useQuery(['festivalRequests', page], () =>
    getFestivalRequestList(page, 5),
  );
  const [requestId, setRequestId] = useRecoilState(festivalRequestId);

  const request: InputTypes = data.content.filter(
    ({ id }: { id: number }) => id === requestId,
  )[0];

  const submitRequestHandler = () => {
    submitRequest(requestId, setState);
  };

  return (
    <StyledRequestModal>
      <Sheet transparent>
        <InnerSheet>
          <TitleCancelHeader
            setState={setState}
            setOpenedList={setOpenedList}
            title="축제 요청 확인"
            color="white"
          />
          <SheetBody>
            {inputProps.map((arr, idx) => {
              // if (idx >= 4) return;
              return (
                <InputLine key={idx}>
                  <FlexLabel>
                    <Text message={labelProps[idx]} />
                  </FlexLabel>
                  {idx === 5 ? (
                    <FlexInput>
                      <Link href={request[inputProps[idx][0]]} color="skyblue">
                        클릭해서 보기
                      </Link>
                    </FlexInput>
                  ) : (
                    <FlexInput>
                      <Text message={request[inputProps[idx][0]]} />
                    </FlexInput>
                  )}
                </InputLine>
              );
            })}
            {/* <InputLine>
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
            </InputLine> */}
          </SheetBody>
          <SubmitButton>
            <Button isText clickHandler={submitRequestHandler}>
              <Text message="승인" color="black" />
            </Button>
          </SubmitButton>
        </InnerSheet>
      </Sheet>
    </StyledRequestModal>
  );
};

export default RequestConfirmModal;
