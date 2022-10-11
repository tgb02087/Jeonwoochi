import { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Sheet from '../atoms/Sheet';
import Text from '../atoms/Text';
import TitleCancelHeader from './TitleCancelHeader';
import { MapData } from '../../mocks/handlers/festival_list';

interface PropTypes {
  list: MapData[] | undefined;
  setState: Dispatch<SetStateAction<boolean>>;
  setOpenedFestivalModal: Dispatch<SetStateAction<boolean>>;
  setFestivalIdx: Dispatch<SetStateAction<number>>;
}
const StyledFestivalListModal = styled.div`
  width: 100vw;
  height: 100vh;
  ${tw`flex justify-center items-center`}
`;
const InnerSheet = styled.div`
  ${tw`flex flex-col`}
  width: 40vw;
  height: 60vh;
  gap: 2rem;
  z-index: 1;
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
 * 거리가 비슷한 축제 리스트를 보여주는 모달
 * 제목을 클릭하면 해당 축제 상세 모달로 넘어간다
 *
 * @author jojo
 */
const FestivalListModal = ({
  list,
  setState,
  setOpenedFestivalModal,
  setFestivalIdx,
}: PropTypes) => {
  const clickHandler = (idx: number) => {
    setState(false);
    setOpenedFestivalModal(true);
    setFestivalIdx(idx);
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
                      <FestivalTitle onClick={() => clickHandler(idx)}>
                        <Text message={festival.festivalName} />
                      </FestivalTitle>
                    </TableRow>
                  );
                })
              ) : (
                <Text message="로딩 중입니다..." />
              )}
            </TableBody>
          </SheetBody>
        </InnerSheet>
      </Sheet>
    </StyledFestivalListModal>
  );
};

export default FestivalListModal;
