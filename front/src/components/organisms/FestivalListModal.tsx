import { Dispatch, SetStateAction, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Sheet from '../atoms/Sheet';
import Text from '../atoms/Text';
import TitleCancelHeader from './TitleCancelHeader';
import { useQuery } from '@tanstack/react-query';
import getFestivalRequestList from '../../api/getFestivalRequestList';
import PageButtons from './PageButtons';
import { useRecoilState } from 'recoil';
import { festivalRequestPage } from '../../recoil/atoms/festivalRequestPage';
import { festivalRequestId } from '../../recoil/atoms/festivalRequestId';
import { MapData } from '../../mocks/handlers/festival_list';

interface PropTypes {
  list: MapData[] | undefined;
  setState: Dispatch<SetStateAction<boolean>>;
  setOpenedFestivalModal: Dispatch<SetStateAction<boolean>>;
  setFestivalIdx: Dispatch<SetStateAction<number>>;
}
interface FestivalRequestTypes {
  id: number;
  festivalName: string;
}
const StyledFestivalListModal = styled.div`
  width: 100vw;
  height: 100vh;
  ${tw`flex justify-center items-center`}
  z-index: 1;
`;
const InnerSheet = styled.div`
  ${tw`flex flex-col`}
  width: 40vw;
  height: 60vh;
  gap: 2rem;
`;
const SheetHeader = styled.div`
  height: 5vh;
`;
const SheetBody = styled.div`
  ${tw`flex flex-col justify-between`}
  height: 55vh;
  overflow-y: auto;
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
 * 축제 요청 리스트를 확인하는 모달. 관리자만 접근 가능.
 *
 * @author jojo
 */
const FestivalListModal = ({
  list,
  setState,
  setOpenedFestivalModal,
  setFestivalIdx,
}: PropTypes) => {
  //   const [page, setPage] = useRecoilState(festivalRequestPage);
  //   const [, setRequestId] = useRecoilState(festivalRequestId);

  //   const { data } = useQuery(['festivalRequests', page], () =>
  //     getFestivalRequestList(page, 5),
  //   );

  const clickHandler = (idx: number) => {
    setState(false);
    setOpenedFestivalModal(true);
    setFestivalIdx(idx);
    // setOpenedDetail(true);
    // setRequestId(id);
  };

  return (
    <StyledFestivalListModal>
      <Sheet transparent>
        <InnerSheet>
          <SheetHeader>
            <TitleCancelHeader
              setState={setState}
              title="축제 리스트"
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
              {list ? (
                list.map((festival: MapData, idx: number) => {
                  return (
                    <TableRow key={idx + festival.festivalName}>
                      <FestivalNo>
                        <Text message={idx + 1 + ''} />
                      </FestivalNo>
                      <FestivalTitle onClick={() => console.log('tqs')}>
                        <Text message={festival.festivalName} />
                      </FestivalTitle>
                    </TableRow>
                  );
                })
              ) : (
                <Text message="로딩 중입니다..." />
              )}
            </TableBody>
            {/* <TableFooter>
              <PageButtons
                totalPage={data?.totalPages}
                page={page}
                setPage={setPage}
                pagingColor={'white'}
              />
            </TableFooter> */}
          </SheetBody>
        </InnerSheet>
      </Sheet>
    </StyledFestivalListModal>
  );
};

export default FestivalListModal;
