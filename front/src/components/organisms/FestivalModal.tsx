import { Dispatch, SetStateAction } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { MapData } from '../../mocks/handlers/festival_list';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Sheet from '../atoms/Sheet';
import Text from '../atoms/Text';
import FestivalInfos from './FestivalInfos';
import TitleCancelHeader from './TitleCancelHeader';

interface PropTypes {
  info: MapData | null;
  setState: Dispatch<SetStateAction<boolean>>;
}
const StyledFestivalModal = styled.div`
  ${tw`absolute `}
  width: 40vw;
  height: 30vw;
  top: 20%;
  right: 1rem;
`;
const InnerSheet = styled.div`
  ${tw`flex flex-col`}
  width: 100%;
  padding: 1rem;
  gap: 1rem;
`;
const SheetBody = styled.div`
  ${tw`flex`}
  gap: 1rem;
`;
const LeftBody = styled.div`
  width: 20vw;
`;
const RightBody = styled.div`
  ${tw`flex flex-col justify-between items-center`}
  width: 20vw;
  height: 50vh;
  gap: 1rem;
`;
/**
 * 축제 별 모달 컴포넌트
 * Sheet 안에 Header, Body로 나뉘고
 * LeftBody에는 포스터, RightBody에는 축제 정보
 *
 * @author jojo
 */
const FestivalModal = ({ info, setState }: PropTypes) => {
  // console.log(info);
  const navigate = useNavigate();
  const linkToMapApiPageHandler = (info: MapData | undefined) => {
    if (info?.id) {
      console.log(info);
      navigate(`/map/${info.id}`, { state: info });
    } else {
      console.log('에러나버림');
    }
  };

  return (
    <StyledFestivalModal>
      <Sheet transparent>
        {info ? (
          <InnerSheet>
            <TitleCancelHeader
              setState={setState}
              title={info.festivalName}
              color="white"
            />
            <SheetBody>
              <LeftBody>
                <Image src={info.image} alt="poster" />
              </LeftBody>
              <RightBody>
                <FestivalInfos info={info} size={1.3} />
                <Button
                  isText
                  clickHandler={() => linkToMapApiPageHandler(info)}
                >
                  <Text message={'상세보기'} color="black" />
                </Button>
              </RightBody>
            </SheetBody>
          </InnerSheet>
        ) : (
          <Text color="white" message={'로딩 중입니다...'} />
        )}
      </Sheet>
    </StyledFestivalModal>
  );
};

export default FestivalModal;
