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
import { useQuery } from '@tanstack/react-query';
import getFestivalRequestList from '../../api/getFestivalRequestList';
import PageButtons from './PageButtons';

interface PropTypes {
  setState: Dispatch<SetStateAction<boolean>>;
}
interface FestivalRequestTypes {
  id: number;
  festivalName: string;
}
const StyledRequestModal = styled.div`
  width: 60vw;
  z-index: 1;
`;
const InnerSheet = styled.div`
  ${tw`flex flex-col`}
  width: 100%;
  height: 60vh;
  gap: 2rem;
`;
const SheetHeader = styled.div`
  height: 5vh;
`;
const SheetBody = styled.div`
  ${tw`flex flex-col justify-between`}
  height: 55vh;
`;
const TableBody = styled.div`
  ${tw`flex flex-col items-center`}
  gap: 1.5rem;
`;
const TableFooter = styled.div`
  ${tw`flex justify-center`}
`;
const TableRow = styled.div`
  ${tw`flex`}
  width: 90%;
  gap: 1rem;
`;
const FestivalNo = styled.div`
  ${tw`flex justify-start`}
  width: 30%;
`;
const FestivalTitle = styled.div`
  ${tw`flex justify-start`}
  width: 70%;
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}
`;
/**
 * 축제 요청 확인 모달. 관리자만 확인 가능.
 * 축제 요청을 보고 승인할 수 있음.
 *
 * @author jojo
 */
const RequestConfirmModal = ({ setState }: PropTypes) => {
  const [page, setPage] = useState(0);

  const { data } = useQuery(
    ['festivalRequests', page],
    () => getFestivalRequestList(page, 5),
    {},
  );

  const clickHandler = () => {
    console.log('click!');
  };

  console.log(data);

  return (
    <StyledRequestModal>
      <Sheet transparent>
        <InnerSheet>
          <SheetHeader>
            <TitleCancelHeader
              setState={setState}
              title="관리자 페이지"
              color="white"
            />
          </SheetHeader>
          <SheetBody>
            <TableBody>
              <TableRow>
                <FestivalNo>
                  <Text message="No" size={1.3} />
                </FestivalNo>
                <FestivalTitle>
                  <Text message="축제 제목" size={1.3} />
                </FestivalTitle>
              </TableRow>
              {data ? (
                data.content.map(
                  ({ id, festivalName }: FestivalRequestTypes) => {
                    return (
                      <TableRow key={id + festivalName}>
                        <FestivalNo>
                          <Text message={id + ''} />
                        </FestivalNo>
                        <FestivalTitle onClick={clickHandler}>
                          <Text message={festivalName} />
                        </FestivalTitle>
                      </TableRow>
                    );
                  },
                )
              ) : (
                <Text message="로딩 중입니다..." />
              )}
            </TableBody>
            <TableFooter>
              <PageButtons
                totalPage={data?.totalPages}
                page={page}
                setPage={setPage}
                pagingColor={'white'}
              />
            </TableFooter>
          </SheetBody>
        </InnerSheet>
      </Sheet>
    </StyledRequestModal>
  );
};

export default RequestConfirmModal;
